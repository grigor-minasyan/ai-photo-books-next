import type { enUS } from "@clerk/localizations";

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export const clerkHy: DeepPartial<typeof enUS> = {
  locale: "en-US",
  apiKeys: {
    action__add: "Add new key",
    action__search: "Search keys",
    copySecret: {
      formButtonPrimary__copyAndClose: "Copy & Close",
      formHint:
        "For security reasons, we won't allow you to view it again later.",
      formTitle: 'Copy your "{{name}}" API Key now',
    },
    createdAndExpirationStatus__expiresOn:
      "Created {{ createdDate | shortDate('en-US') }} • Expires {{ expiresDate | longDate('en-US') }}",
    createdAndExpirationStatus__never:
      "Created {{ createdDate | shortDate('en-US') }} • Never expires",
    detailsTitle__emptyRow: "No API keys found",
    formButtonPrimary__add: "Create key",
    formFieldCaption__expiration__expiresOn: "Expiring {{ date }}",
    formFieldCaption__expiration__never: "This key will never expire",
    formFieldOption__expiration__180d: "180 Days",
    formFieldOption__expiration__1d: "1 Day",
    formFieldOption__expiration__1y: "1 Year",
    formFieldOption__expiration__30d: "30 Days",
    formFieldOption__expiration__60d: "60 Days",
    formFieldOption__expiration__7d: "7 Days",
    formFieldOption__expiration__90d: "90 Days",
    formFieldOption__expiration__never: "Never",
    formHint:
      "Provide a name to generate a new key. You’ll be able to revoke it anytime.",
    formTitle: "Add new API key",
    lastUsed__days: "{{days}}d ago",
    lastUsed__hours: "{{hours}}h ago",
    lastUsed__minutes: "{{minutes}}m ago",
    lastUsed__months: "{{months}}mo ago",
    lastUsed__seconds: "{{seconds}}s ago",
    lastUsed__years: "{{years}}y ago",
    menuAction__revoke: "Revoke key",
    revokeConfirmation: {
      confirmationText: "Revoke",
      formButtonPrimary__revoke: "Revoke key",
      formHint: "Are you sure you want to delete this Secret key?",
      formTitle: 'Revoke "{{apiKeyName}}" secret key?',
    },
  },
  backButton: "Back",
  badge__activePlan: "Active",
  badge__canceledEndsAt: "Canceled • Ends {{ date | shortDate('en-US') }}",
  badge__currentPlan: "Current plan",
  badge__default: "Default",
  badge__endsAt: "Ends {{ date | shortDate('en-US') }}",
  badge__expired: "Expired",
  badge__freeTrial: "Free trial",
  badge__otherImpersonatorDevice: "Other impersonator device",
  badge__pastDueAt: "Past due {{ date | shortDate('en-US') }}",
  badge__pastDuePlan: "Past due",
  badge__primary: "Primary",
  badge__renewsAt: "Renews {{ date | shortDate('en-US') }}",
  badge__requiresAction: "Requires action",
  badge__startsAt: "Starts {{ date | shortDate('en-US') }}",
  badge__thisDevice: "This device",
  badge__trialEndsAt: "Trial ends {{ date | shortDate('en-US') }}",
  badge__unverified: "Unverified",
  badge__upcomingPlan: "Upcoming",
  badge__userDevice: "User device",
  badge__you: "You",
  createOrganization: {
    formButtonSubmit: "Create organization",
    invitePage: {
      formButtonReset: "Skip",
    },
    title: "Create organization",
  },
  dates: {
    lastDay: "Yesterday at {{ date | timeString('en-US') }}",
    next6Days:
      "{{ date | weekday('en-US','long') }} at {{ date | timeString('en-US') }}",
    nextDay: "Tomorrow at {{ date | timeString('en-US') }}",
    numeric: "{{ date | numeric('en-US') }}",
    previous6Days:
      "Last {{ date | weekday('en-US','long') }} at {{ date | timeString('en-US') }}",
    sameDay: "Today at {{ date | timeString('en-US') }}",
  },
  dividerText: "or",
  footerActionLink__alternativePhoneCodeProvider: "Send code via SMS instead",
  footerActionLink__useAnotherMethod: "Use another method",
  footerPageLink__help: "Help",
  footerPageLink__privacy: "Privacy",
  footerPageLink__terms: "Terms",
  formButtonPrimary: "Continue",
  formButtonPrimary__verify: "Verify",
  formFieldAction__forgotPassword: "Forgot password?",
  formFieldError__matchingPasswords: "Passwords match.",
  formFieldError__notMatchingPasswords: "Passwords don't match.",
  formFieldError__verificationLinkExpired:
    "The verification link expired. Please request a new link.",
  formFieldHintText__optional: "Optional",
  formFieldHintText__slug:
    "A slug is a human-readable ID that must be unique. It’s often used in URLs.",
  formFieldInputPlaceholder__apiKeyDescription:
    "Explain why you’re generating this key",
  formFieldInputPlaceholder__apiKeyExpirationDate: "Select date",
  formFieldInputPlaceholder__apiKeyName: "Enter your secret key name",
  formFieldInputPlaceholder__backupCode: "Enter backup code",
  formFieldInputPlaceholder__confirmDeletionUserAccount: "Delete account",
  formFieldInputPlaceholder__emailAddress: "Enter your email address",
  formFieldInputPlaceholder__emailAddress_username: "Enter email or username",
  formFieldInputPlaceholder__emailAddresses:
    "example@email.com, example2@email.com",
  formFieldInputPlaceholder__firstName: "First name",
  formFieldInputPlaceholder__lastName: "Last name",
  formFieldInputPlaceholder__organizationDomain: "example.com",
  formFieldInputPlaceholder__organizationDomainEmailAddress: "you@example.com",
  formFieldInputPlaceholder__organizationName: "Organization name",
  formFieldInputPlaceholder__organizationSlug: "my-org",
  formFieldInputPlaceholder__password: "Enter your password",
  formFieldInputPlaceholder__phoneNumber: "Enter your phone number",
  formFieldInputPlaceholder__username: undefined,
  formFieldInput__emailAddress_format: "Example format: name@example.com",
  formFieldLabel__apiKey: "API key",
  formFieldLabel__apiKeyDescription: "Description",
  formFieldLabel__apiKeyExpiration: "Expiration",
  formFieldLabel__apiKeyName: "Secret key name",
  formFieldLabel__automaticInvitations:
    "Enable automatic invitations for this domain",
  formFieldLabel__backupCode: "Backup code",
  formFieldLabel__confirmDeletion: "Confirmation",
  formFieldLabel__confirmPassword: "Confirm password",
  formFieldLabel__currentPassword: "Current password",
  formFieldLabel__emailAddress: "Email address",
  formFieldLabel__emailAddress_username: "Email address or username",
  formFieldLabel__emailAddresses: "Email addresses",
  formFieldLabel__firstName: "First name",
  formFieldLabel__lastName: "Last name",
  formFieldLabel__newPassword: "New password",
  formFieldLabel__organizationDomain: "Domain",
  formFieldLabel__organizationDomainDeletePending:
    "Delete pending invitations and suggestions",
  formFieldLabel__organizationDomainEmailAddress: "Verification email address",
  formFieldLabel__organizationDomainEmailAddressDescription:
    "Enter an email address under this domain to receive a code and verify this domain.",
  formFieldLabel__organizationName: "Name",
  formFieldLabel__organizationSlug: "Slug",
  formFieldLabel__passkeyName: "Name of passkey",
  formFieldLabel__password: "Password",
  formFieldLabel__phoneNumber: "Phone number",
  formFieldLabel__role: "Role",
  formFieldLabel__signOutOfOtherSessions: "Sign out of all other devices",
  formFieldLabel__username: "Username",
  impersonationFab: {
    action__signOut: "Sign out",
    title: "Signed in as {{identifier}}",
  },
  lastAuthenticationStrategy: "Last used",
  maintenanceMode:
    "We are currently undergoing maintenance, but don't worry, it shouldn't take more than a few minutes.",
  membershipRole__admin: "Admin",
  membershipRole__basicMember: "Member",
  membershipRole__guestMember: "Guest",
  paginationButton__next: "Next",
  paginationButton__previous: "Previous",
  paginationRowText__displaying: "Displaying",
  paginationRowText__of: "of",
  reverification: {
    alternativeMethods: {
      actionLink: "Get help",
      actionText: "Don’t have any of these?",
      blockButton__backupCode: "Use a backup code",
      blockButton__emailCode: "Email code to {{identifier}}",
      blockButton__passkey: "Use your passkey",
      blockButton__password: "Continue with your password",
      blockButton__phoneCode: "Send SMS code to {{identifier}}",
      blockButton__totp: "Use your authenticator app",
      getHelp: {
        blockButton__emailSupport: "Email support",
        content:
          "If you have trouble verifying your account, email us and we will work with you to restore access as soon as possible.",
        title: "Get help",
      },
      subtitle:
        "Facing issues? You can use any of these methods for verification.",
      title: "Use another method",
    },
    backupCodeMfa: {
      subtitle:
        "Enter the backup code you received when setting up two-step authentication",
      title: "Enter a backup code",
    },
    emailCode: {
      formTitle: "Verification code",
      resendButton: "Didn't receive a code? Resend",
      subtitle: "Enter the code sent to your email to continue",
      title: "Verification required",
    },
    noAvailableMethods: {
      message:
        "Cannot proceed with verification. No suitable authentication factor is configured",
      subtitle: "An error occurred",
      title: "Cannot verify your account",
    },
    passkey: {
      blockButton__passkey: "Use your passkey",
      subtitle:
        "Using your passkey confirms your identity. Your device may ask for your fingerprint, face, or screen lock.",
      title: "Use your passkey",
    },
    password: {
      actionLink: "Use another method",
      subtitle: "Enter your current password to continue",
      title: "Verification required",
    },
    phoneCode: {
      formTitle: "Verification code",
      resendButton: "Didn't receive a code? Resend",
      subtitle: "Enter the code sent to your phone to continue",
      title: "Verification required",
    },
    phoneCodeMfa: {
      formTitle: "Verification code",
      resendButton: "Didn't receive a code? Resend",
      subtitle: "Enter the code sent to your phone to continue",
      title: "Verification required",
    },
    totpMfa: {
      formTitle: "Verification code",
      subtitle:
        "Enter the code generated by your authenticator app to continue",
      title: "Verification required",
    },
  },
  signIn: {
    accountSwitcher: {
      action__addAccount: "Add account",
      action__signOutAll: "Sign out of all accounts",
      subtitle: "Select the account with which you wish to continue.",
      title: "Choose an account",
    },
    alternativeMethods: {
      actionLink: "Get help",
      actionText: "Don’t have any of these?",
      blockButton__backupCode: "Use a backup code",
      blockButton__emailCode: "Email code to {{identifier}}",
      blockButton__emailLink: "Email link to {{identifier}}",
      blockButton__passkey: "Sign in with your passkey",
      blockButton__password: "Sign in with your password",
      blockButton__phoneCode: "Send SMS code to {{identifier}}",
      blockButton__totp: "Use your authenticator app",
      getHelp: {
        blockButton__emailSupport: "Email support",
        content:
          "If you have trouble signing into your account, email us and we will work with you to restore access as soon as possible.",
        title: "Get help",
      },
      subtitle: "Facing issues? You can use any of these methods to sign in.",
      title: "Use another method",
    },
    alternativePhoneCodeProvider: {
      formTitle: "Verification code",
      resendButton: "Didn't receive a code? Resend",
      subtitle: "to continue to {{applicationName}}",
      title: "Check your {{provider}}",
    },
    backupCodeMfa: {
      subtitle:
        "Your backup code is the one you got when setting up two-step authentication.",
      title: "Enter a backup code",
    },
    emailCode: {
      formTitle: "Verification code",
      resendButton: "Didn't receive a code? Resend",
      subtitle: "to continue to {{applicationName}}",
      title: "Check your email",
    },
    emailCodeMfa: {
      formTitle: "Check your email",
      resendButton: "Didn't receive a code? Resend",
      subtitle: "to continue to {{applicationName}}",
      title: "Check your email",
    },
    emailLink: {
      clientMismatch: {
        subtitle:
          "To continue, open the verification link on the device and browser from which you initiated the sign-in",
        title: "Verification link is invalid for this device",
      },
      expired: {
        subtitle: "Return to the original tab to continue.",
        title: "This verification link has expired",
      },
      failed: {
        subtitle: "Return to the original tab to continue.",
        title: "This verification link is invalid",
      },
      formSubtitle: "Use the verification link sent to your email",
      formTitle: "Verification link",
      loading: {
        subtitle: "You will be redirected soon",
        title: "Signing in...",
      },
      resendButton: "Didn't receive a link? Resend",
      subtitle: "to continue to {{applicationName}}",
      title: "Check your email",
      unusedTab: {
        title: "You may close this tab",
      },
      verified: {
        subtitle: "You will be redirected soon",
        title: "Successfully signed in",
      },
      verifiedSwitchTab: {
        subtitle: "Return to original tab to continue",
        subtitleNewTab: "Return to the newly opened tab to continue",
        titleNewTab: "Signed in on other tab",
      },
    },
    emailLinkMfa: {
      formSubtitle: "Use the verification link sent to your email",
      resendButton: "Didn't receive a link? Resend",
      subtitle: "to continue to {{applicationName}}",
      title: "Check your email",
    },
    enterpriseConnections: {
      subtitle:
        "Select the enterprise account with which you wish to continue.",
      title: "Choose your enterprise account",
    },
    forgotPassword: {
      formTitle: "Reset password code",
      resendButton: "Didn't receive a code? Resend",
      subtitle: "to reset your password",
      subtitle_email: "First, enter the code sent to your email address",
      subtitle_phone: "First, enter the code sent to your phone",
      title: "Reset password",
    },
    forgotPasswordAlternativeMethods: {
      blockButton__resetPassword: "Reset your password",
      label__alternativeMethods: "Or, sign in with another method",
      title: "Forgot Password?",
    },
    newDeviceVerificationNotice:
      "You're signing in from a new device. We're asking for verification to keep your account secure.",
    noAvailableMethods: {
      message:
        "Cannot proceed with sign in. There's no available authentication factor.",
      subtitle: "An error occurred",
      title: "Cannot sign in",
    },
    passkey: {
      subtitle:
        "Using your passkey confirms it's you. Your device may ask for your fingerprint, face or screen lock.",
      title: "Use your passkey",
    },
    password: {
      actionLink: "Use another method",
      subtitle: "Enter the password associated with your account",
      title: "Enter your password",
    },
    passwordCompromised: {
      title: "Password compromised",
    },
    passwordPwned: {
      title: "Password compromised",
    },
    passwordUntrusted: {
      title: "Password untrusted",
    },
    phoneCode: {
      formTitle: "Verification code",
      resendButton: "Didn't receive a code? Resend",
      subtitle: "to continue to {{applicationName}}",
      title: "Check your phone",
    },
    phoneCodeMfa: {
      formTitle: "Verification code",
      resendButton: "Didn't receive a code? Resend",
      subtitle:
        "To continue, please enter the verification code sent to your phone",
      title: "Check your phone",
    },
    resetPassword: {
      formButtonPrimary: "Reset Password",
      requiredMessage:
        "For security reasons, it is required to reset your password.",
      successMessage:
        "Your password was successfully changed. Signing you in, please wait a moment.",
      title: "Set new password",
    },
    resetPasswordMfa: {
      detailsLabel:
        "We need to verify your identity before resetting your password.",
    },
    start: {
      actionLink: "Sign up",
      actionLink__join_waitlist: "Join waitlist",
      actionLink__use_email: "Use email",
      actionLink__use_email_username: "Use email or username",
      actionLink__use_passkey: "Use passkey instead",
      actionLink__use_phone: "Use phone",
      actionLink__use_username: "Use username",
      actionText: "Don’t have an account?",
      actionText__join_waitlist: "Want early access?",
      alternativePhoneCodeProvider: {
        actionLink: "Use another method",
        label: "{{provider}} phone number",
        subtitle:
          "Enter your phone number to get a verification code on {{provider}}.",
        title: "Sign in to {{applicationName}} with {{provider}}",
      },
      subtitle: "Welcome back! Please sign in to continue",
      subtitleCombined: undefined,
      title: "Sign in to {{applicationName}}",
      titleCombined: "Continue to {{applicationName}}",
    },
  },
  signInEnterPasswordTitle: "Enter your password",
  signUp: {
    alternativePhoneCodeProvider: {
      resendButton: "Didn't receive a code? Resend",
      subtitle: "Enter the verification code sent to your {{provider}}",
      title: "Verify your {{provider}}",
    },
    continue: {
      actionLink: "Sign in",
      actionText: "Already have an account?",
      subtitle: "Please fill in the remaining details to continue.",
      title: "Fill in missing fields",
    },
    emailCode: {
      formSubtitle: "Enter the verification code sent to your email address",
      formTitle: "Verification code",
      resendButton: "Didn't receive a code? Resend",
      subtitle: "Enter the verification code sent to your email",
      title: "Verify your email",
    },
    emailLink: {
      clientMismatch: {
        subtitle:
          "To continue, open the verification link on the device and browser from which you initiated the sign-up",
        title: "Verification link is invalid for this device",
      },
      formSubtitle: "Use the verification link sent to your email address",
      formTitle: "Verification link",
      loading: {
        title: "Signing up...",
      },
      resendButton: "Didn't receive a link? Resend",
      subtitle: "to continue to {{applicationName}}",
      title: "Verify your email",
      verified: {
        title: "Successfully signed up",
      },
      verifiedSwitchTab: {
        subtitle: "Return to the newly opened tab to continue",
        subtitleNewTab: "Return to previous tab to continue",
        title: "Successfully verified email",
      },
    },
    enterpriseConnections: {
      subtitle:
        "Select the enterprise account with which you wish to continue.",
      title: "Choose your enterprise account",
    },
    legalConsent: {
      checkbox: {
        label__onlyPrivacyPolicy:
          'I agree to the {{ privacyPolicyLink || link("Privacy Policy") }}',
        label__onlyTermsOfService:
          'I agree to the {{ termsOfServiceLink || link("Terms of Service") }}',
        label__termsOfServiceAndPrivacyPolicy:
          'I agree to the {{ termsOfServiceLink || link("Terms of Service") }} and {{ privacyPolicyLink || link("Privacy Policy") }}',
      },
      continue: {
        subtitle: "Please read and accept the terms to continue",
        title: "Legal consent",
      },
    },
    phoneCode: {
      formSubtitle: "Enter the verification code sent to your phone number",
      formTitle: "Verification code",
      resendButton: "Didn't receive a code? Resend",
      subtitle: "Enter the verification code sent to your phone",
      title: "Verify your phone",
    },
    restrictedAccess: {
      actionLink: "Sign in",
      actionText: "Already have an account?",
      blockButton__emailSupport: "Email support",
      blockButton__joinWaitlist: "Join waitlist",
      subtitle:
        "Sign ups are currently disabled. If you believe you should have access, please contact support.",
      subtitleWaitlist:
        "Sign ups are currently disabled. To be the first to know when we launch, join the waitlist.",
      title: "Access restricted",
    },
    start: {
      actionLink: "Sign in",
      actionLink__use_email: "Use email instead",
      actionLink__use_phone: "Use phone instead",
      actionText: "Already have an account?",
      alternativePhoneCodeProvider: {
        actionLink: "Use another method",
        label: "{{provider}} phone number",
        subtitle:
          "Enter your phone number to get a verification code on {{provider}}.",
        title: "Sign up to {{applicationName}} with {{provider}}",
      },
      subtitle: "Welcome! Please fill in the details to get started.",
      subtitleCombined: "Welcome! Please fill in the details to get started.",
      title: "Create your account",
      titleCombined: "Create your account",
    },
    web3Solana: {
      subtitle: "Select a wallet below to sign up",
      title: "Sign up with Solana",
    },
  },
  socialButtonsBlockButton: "Continue with {{provider|titleize}}",
  socialButtonsBlockButtonManyInView: "{{provider|titleize}}",
  taskResetPassword: {
    formButtonPrimary: "Reset Password",
    signOut: {
      actionLink: "Sign out",
      actionText: "Signed in as {{identifier}}",
    },
    subtitle: "Your account requires a new password before you can continue",
    title: "Reset your password",
  },
  userButton: {
    action__addAccount: "Add account",
    action__closeUserMenu: "Close user menu",
    action__manageAccount: "Manage account",
    action__openUserMenu: "Open user menu",
    action__signOut: "Sign out",
    action__signOutAll: "Sign out of all accounts",
  },
  userProfile: {
    apiKeysPage: {
      title: "API keys",
    },
    backupCodePage: {
      actionLabel__copied: "Copied!",
      actionLabel__copy: "Copy all",
      actionLabel__download: "Download .txt",
      actionLabel__print: "Print",
      infoText1: "Backup codes will be enabled for this account.",
      infoText2:
        "Keep the backup codes secret and store them securely. You may regenerate backup codes if you suspect they have been compromised.",
      subtitle__codelist: "Store them securely and keep them secret.",
      successMessage:
        "Backup codes are now enabled. You can use one of these to sign in to your account, if you lose access to your authentication device. Each code can only be used once.",
      successSubtitle:
        "You can use one of these to sign in to your account, if you lose access to your authentication device.",
      title: "Add backup code verification",
      title__codelist: "Backup codes",
    },
    connectedAccountPage: {
      formHint: "Select a provider to connect your account.",
      formHint__noAccounts:
        "There are no available external account providers.",
      removeResource: {
        messageLine1: "{{identifier}} will be removed from this account.",
        messageLine2:
          "You will no longer be able to use this connected account and any dependent features will no longer work.",
        successMessage:
          "{{connectedAccount}} has been removed from your account.",
        title: "Remove connected account",
      },
      socialButtonsBlockButton: "{{provider|titleize}}",
      successMessage: "The provider has been added to your account",
      title: "Add connected account",
    },
    deletePage: {
      actionDescription: 'Type "Delete account" below to continue.',
      confirm: "Delete account",
      messageLine1:
        "Are you sure you want to delete your account? Some associated data may be retained. To request full data deletion, please contact support.",
      messageLine2: "This action is permanent and irreversible.",
      title: "Delete account",
    },
    emailAddressPage: {
      emailCode: {
        formHint:
          "An email containing a verification code will be sent to this email address.",
        formSubtitle: "Enter the verification code sent to {{identifier}}",
        formTitle: "Verification code",
        resendButton: "Didn't receive a code? Resend",
        successMessage:
          "The email {{identifier}} has been added to your account.",
      },
      emailLink: {
        formHint:
          "An email containing a verification link will be sent to this email address.",
        formSubtitle:
          "Click on the verification link in the email sent to {{identifier}}",
        formTitle: "Verification link",
        resendButton: "Didn't receive a link? Resend",
        successMessage:
          "The email {{identifier}} has been added to your account.",
      },
      enterpriseSSOLink: {
        formButton: "Click to sign-in",
        formSubtitle: "Complete the sign-in with {{identifier}}",
      },
      formHint:
        "You'll need to verify this email address before it can be added to your account.",
      removeResource: {
        messageLine1: "{{identifier}} will be removed from this account.",
        messageLine2:
          "You will no longer be able to sign in using this email address.",
        successMessage: "{{emailAddress}} has been removed from your account.",
        title: "Remove email address",
      },
      title: "Add email address",
      verifyTitle: "Verify email address",
    },
    formButtonPrimary__add: "Add",
    formButtonPrimary__continue: "Continue",
    formButtonPrimary__finish: "Finish",
    formButtonPrimary__remove: "Remove",
    formButtonPrimary__save: "Save",
    formButtonReset: "Cancel",

    mobileButton__menu: "Menu",
    navbar: {
      account: "Profile",
      apiKeys: "API keys",
      billing: "Billing",
      description: "Manage your account info.",
      security: "Security",
      title: "Account",
    },
    passkeyScreen: {
      removeResource: {
        messageLine1: "{{name}} will be removed from this account.",
        title: "Remove passkey",
      },
      subtitle__rename:
        "You can change the passkey name to make it easier to find.",
      title__rename: "Rename Passkey",
    },
    passwordPage: {
      checkboxInfoText__signOutOfOtherSessions:
        "It is recommended to sign out of all other devices which may have used your old password.",
      readonly:
        "Your password can currently not be edited because you can sign in only via the enterprise connection.",
      successMessage__set: "Your password has been set.",
      successMessage__signOutOfOtherSessions:
        "All other devices have been signed out.",
      successMessage__update: "Your password has been updated.",
      title__set: "Set password",
      title__update: "Update password",
    },
    phoneNumberPage: {
      infoText:
        "A text message containing a verification code will be sent to this phone number. Message and data rates may apply.",
      removeResource: {
        messageLine1: "{{identifier}} will be removed from this account.",
        messageLine2:
          "You will no longer be able to sign in using this phone number.",
        successMessage: "{{phoneNumber}} has been removed from your account.",
        title: "Remove phone number",
      },
      successMessage: "{{identifier}} has been added to your account.",
      title: "Add phone number",
      verifySubtitle: "Enter the verification code sent to {{identifier}}",
      verifyTitle: "Verify phone number",
    },
    plansPage: {
      title: "Plans",
    },
    profilePage: {
      fileDropAreaHint: "Recommended size 1:1, up to 10MB.",
      imageFormDestructiveActionSubtitle: "Remove",
      imageFormSubtitle: "Upload",
      imageFormTitle: "Profile image",
      readonly:
        "Your profile information has been provided by the enterprise connection and cannot be edited.",
      successMessage: "Your profile has been updated.",
      title: "Update profile",
    },
    start: {
      activeDevicesSection: {
        destructiveAction: "Sign out of device",
        title: "Active devices",
      },
      connectedAccountsSection: {
        actionLabel__connectionFailed: "Reconnect",
        actionLabel__reauthorize: "Authorize now",
        destructiveActionTitle: "Remove",
        primaryButton: "Connect account",
        subtitle__disconnected: "This account has been disconnected.",
        subtitle__reauthorize:
          "The required scopes have been updated, and you may be experiencing limited functionality. Please re-authorize this application to avoid any issues",
        title: "Connected accounts",
      },
      dangerSection: {
        deleteAccountButton: "Delete account",
        title: "Delete account",
      },
      emailAddressesSection: {
        destructiveAction: "Remove email",
        detailsAction__nonPrimary: "Set as primary",
        detailsAction__primary: "Complete verification",
        detailsAction__unverified: "Verify",
        primaryButton: "Add email address",
        title: "Email addresses",
      },
      enterpriseAccountsSection: {
        title: "Enterprise accounts",
      },
      headerTitle__account: "Profile details",
      headerTitle__security: "Security",
      mfaSection: {
        backupCodes: {
          actionLabel__regenerate: "Regenerate",
          headerTitle: "Backup codes",
          subtitle__regenerate:
            "Get a fresh set of secure backup codes. Prior backup codes will be deleted and cannot be used.",
          title__regenerate: "Regenerate backup codes",
        },
        phoneCode: {
          actionLabel__setDefault: "Set as default",
          destructiveActionLabel: "Remove",
        },
        primaryButton: "Add two-step verification",
        title: "Two-step verification",
        totp: {
          destructiveActionTitle: "Remove",
          headerTitle: "Authenticator application",
        },
      },
      passkeysSection: {
        menuAction__destructive: "Remove",
        menuAction__rename: "Rename",
        primaryButton: "Add a passkey",
        title: "Passkeys",
      },
      passwordSection: {
        primaryButton__setPassword: "Set password",
        primaryButton__updatePassword: "Update password",
        title: "Password",
      },
      phoneNumbersSection: {
        destructiveAction: "Remove phone number",
        detailsAction__nonPrimary: "Set as primary",
        detailsAction__primary: "Complete verification",
        detailsAction__unverified: "Verify phone number",
        primaryButton: "Add phone number",
        title: "Phone numbers",
      },
      profileSection: {
        primaryButton: "Update profile",
        title: "Profile",
      },
      usernameSection: {
        primaryButton__setUsername: "Set username",
        primaryButton__updateUsername: "Update username",
        title: "Username",
      },
      web3WalletsSection: {
        destructiveAction: "Remove wallet",
        detailsAction__nonPrimary: "Set as primary",
        primaryButton: "Connect wallet",
        title: "Web3 wallets",
        web3SelectSolanaWalletScreen: {
          subtitle: "Select a Solana wallet to connect to your account.",
          title: "Add a Solana wallet",
        },
      },
    },
    usernamePage: {
      successMessage: "Your username has been updated.",
      title__set: "Set username",
      title__update: "Update username",
    },
  },
} as const;
