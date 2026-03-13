import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

import { serverEnv } from "@/lib/server-env";

type R2AssetType = "cover" | "back-cover" | "page";
type R2AssetVariant = "raw" | "final";

type R2Config = {
  accountId: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucketName: string;
  region: string;
};

function requiredEnv(name: keyof typeof serverEnv): string {
  const value = serverEnv[name];
  if (!value || typeof value !== "string") {
    throw new Error(`Missing required R2 env variable: ${name}`);
  }
  return value;
}

function getR2Config(): R2Config {
  return {
    accountId: requiredEnv("R2_ACCOUNT_ID"),
    accessKeyId: requiredEnv("R2_ACCESS_KEY_ID"),
    secretAccessKey: requiredEnv("R2_SECRET_ACCESS_KEY"),
    bucketName: requiredEnv("R2_BUCKET_NAME"),
    region: serverEnv.R2_REGION || "auto",
  };
}

function getR2Client(config: R2Config): S3Client {
  return new S3Client({
    region: config.region,
    endpoint: `https://${config.accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    },
  });
}

function sanitizeSegment(value: string): string {
  return value.replace(/[^a-zA-Z0-9-_]/g, "-");
}

export function buildR2ObjectKey({
  generatedBookId,
  pageNumber,
  variant,
  assetType,
}: {
  generatedBookId: string;
  pageNumber?: number;
  variant: R2AssetVariant;
  assetType: R2AssetType;
}): string {
  const id = sanitizeSegment(generatedBookId);
  if (assetType === "page") {
    if (!pageNumber || pageNumber < 1) {
      throw new Error("pageNumber is required for page assets");
    }
    return `generated-books/${id}/pages/${pageNumber}/${variant}.jpg`;
  }
  return `generated-books/${id}/${assetType}/${variant}.jpg`;
}

export async function uploadBufferToR2({
  body,
  key,
  contentType = "image/jpeg",
}: {
  body: Buffer;
  key: string;
  contentType?: string;
}): Promise<{ key: string }> {
  const config = getR2Config();
  const client = getR2Client(config);

  await client.send(
    new PutObjectCommand({
      Bucket: config.bucketName,
      Key: key,
      Body: body,
      ContentType: contentType,
    }),
  );

  return { key };
}
