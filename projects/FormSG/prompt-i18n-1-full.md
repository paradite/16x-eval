You are tasked to do a code refactoring. Instructions are as follows:

Extract i18n strings from FormFields/PublicFormSubmitButton.tsx into public-form/index.ts and public-form/en-sg.ts.

Use components/LoginForm.tsx, login/index.ts and login/en-sg.ts as reference.

Instructions for the output format:
- Output code without descriptions, unless it is important.
- Minimize prose, comments and empty lines.
- Only show the relevant code that needs to be modified. Use comments to represent the parts that are not modified.
- Make it easy to copy and paste.
- Consider other possibilities to achieve the result, do not be limited by the prompt.

FormFields/PublicFormSubmitButton.tsx
```tsx
import { MouseEventHandler, useMemo, useState } from 'react'
import { useFormState, UseFormTrigger, useWatch } from 'react-hook-form'
import { Stack, useDisclosure, VisuallyHidden } from '@chakra-ui/react'

import { PAYMENT_CONTACT_FIELD_ID } from '~shared/constants'
import { FormField, LogicDto, MyInfoFormField } from '~shared/types'

import { ThemeColorScheme } from '~theme/foundations/colours'
import { useIsMobile } from '~hooks/useIsMobile'
import Button from '~components/Button'
import InlineMessage from '~components/InlineMessage'
import { FormFieldValues, VerifiableFieldValues } from '~templates/Field'

import { getLogicUnitPreventingSubmit } from '~features/logic/utils'

import { usePublicFormContext } from '../../PublicFormContext'
import { DuplicatePaymentModal } from '../DuplicatePaymentModal/DuplicatePaymentModal'
import { FormPaymentModal } from '../FormPaymentModal/FormPaymentModal'
import { getPreviousPaymentId } from '../FormPaymentPage/FormPaymentService'

interface PublicFormSubmitButtonProps {
  formFields: MyInfoFormField<FormField>[]
  formLogics: LogicDto[]
  colorTheme: string
  onSubmit: MouseEventHandler<HTMLButtonElement> | undefined
  trigger: UseFormTrigger<FormFieldValues>
}

/**
 * This component is split up so that input changes will not rerender the
 * entire FormFields component leading to terrible performance.
 */
export const PublicFormSubmitButton = ({
  formFields,
  formLogics,
  colorTheme,
  onSubmit,
  trigger,
}: PublicFormSubmitButtonProps): JSX.Element => {
  const [prevPaymentId, setPrevPaymentId] = useState('')

  const isMobile = useIsMobile()
  const { isSubmitting } = useFormState()
  const formInputs = useWatch<FormFieldValues>({}) as FormFieldValues
  const { formId, isPaymentEnabled, isPreview } = usePublicFormContext()

  const paymentEmailField = formInputs[
    PAYMENT_CONTACT_FIELD_ID
  ] as VerifiableFieldValues

  const preventSubmissionLogic = useMemo(() => {
    return getLogicUnitPreventingSubmit({
      formInputs,
      formFields,
      formLogics,
    })
  }, [formInputs, formFields, formLogics])

  // For payments submit and pay modal
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: false })

  const checkBeforeOpen = async () => {
    const result = await trigger()

    if (result) {
      // get previous payment
      try {
        const paymentId = await getPreviousPaymentId(
          paymentEmailField.value,
          formId,
        )
        setPrevPaymentId(paymentId)
      } catch (err) {
        setPrevPaymentId('')
      }
      onOpen()
    }
  }

  return (
    <Stack px={{ base: '1rem', md: 0 }} pt="2.5rem" pb="4rem">
      {isOpen ? (
        prevPaymentId ? (
          <DuplicatePaymentModal
            onSubmit={onSubmit}
            onClose={onClose}
            isSubmitting={isSubmitting}
            formId={formId}
            paymentId={prevPaymentId}
          />
        ) : (
          <FormPaymentModal
            onSubmit={onSubmit}
            onClose={onClose}
            isSubmitting={isSubmitting}
          />
        )
      ) : null}
      <Button
        isFullWidth={isMobile}
        w="100%"
        colorScheme={`theme-${colorTheme}` as ThemeColorScheme}
        type="button"
        isLoading={isSubmitting}
        isDisabled={!!preventSubmissionLogic || !onSubmit}
        loadingText="Submitting"
        onClick={isPaymentEnabled && !isPreview ? checkBeforeOpen : onSubmit}
      >
        <VisuallyHidden>End of form.</VisuallyHidden>
        {preventSubmissionLogic
          ? 'Submission disabled'
          : isPaymentEnabled
            ? 'Proceed to pay'
            : 'Submit now'}
      </Button>
      {preventSubmissionLogic ? (
        <InlineMessage variant="warning">
          {preventSubmissionLogic.preventSubmitMessage}
        </InlineMessage>
      ) : null}
    </Stack>
  )
}
```

public-form/index.ts
```ts
export * from './en-sg'

export interface PublicForm {
  errors: {
    notAvailable: string
    notFound: string
    deleted: string
    private: string

    submissionSecretKeyInvalid: {
      title: string
      header: string
      message: string
    }
    myinfo: string
    submitFailure: string
    verifiedFieldExpired_one: string
    verifiedFieldExpired_other: string
  },
  components: {
    PublicFormSubmitButton: {
    }
  }
}
```

public-form/en-sg.ts
```ts
import { PublicForm } from '.'

export const enSG: PublicForm = {
  errors: {
    notAvailable: 'This form is not available.',
    notFound: 'Form not found',
    deleted: 'This form is no longer active',
    private:
      'If you think this is a mistake, please contact the agency that gave you the form link.',

    submissionSecretKeyInvalid: {
      title: 'Invalid form link',
      header: 'This form link is no longer valid.',
      message:
        'A submission may have already been made using this link. If you think this is a mistake, please contact the agency that gave you the form link.',
    },

    myinfo:
      'Your Myinfo details could not be retrieved. Refresh your browser and log in, or try again later.',
    submitFailure:
      'An error occurred whilst processing your submission. Please refresh and try again.',
    verifiedFieldExpired_one:
      'Your verified field {{count}} has expired. Please verify the {{count}} field again.',
    verifiedFieldExpired_other:
      'Your verified fields {{count}} have expired. Please verify those {{count}} fields again.',
  },
  components: {
    PublicFormSubmitButton: {},
  },
}
```

components/LoginForm.tsx
```tsx
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { FormControl, Stack } from '@chakra-ui/react'
import isEmail from 'validator/lib/isEmail'

import { INVALID_EMAIL_ERROR } from '~constants/validation'
import Button from '~components/Button'
import FormErrorMessage from '~components/FormControl/FormErrorMessage'
import FormLabel from '~components/FormControl/FormLabel'
import Input from '~components/Input'

export type LoginFormInputs = {
  email: string
}

interface LoginFormProps {
  onSubmit: (inputs: LoginFormInputs) => Promise<void>
}

export const LoginForm = ({ onSubmit }: LoginFormProps): JSX.Element => {
  const { t } = useTranslation()

  const { handleSubmit, register, formState, setError } =
    useForm<LoginFormInputs>()

  const validateEmail = useCallback((value: string) => {
    return isEmail(value.trim()) || INVALID_EMAIL_ERROR
  }, [])

  const onSubmitForm = async (inputs: LoginFormInputs) => {
    return onSubmit(inputs).catch((e) => {
      setError('email', { type: 'server', message: e.message })
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <FormControl
        isInvalid={!!formState.errors.email}
        isReadOnly={formState.isSubmitting}
        mb="2.5rem"
      >
        <FormLabel isRequired>
          {t(
            'features.login.components.LoginForm.onlyAvailableForPublicOfficers',
          )}
        </FormLabel>
        <Input
          autoComplete="email"
          autoFocus
          placeholder="e.g. jane@data.gov.sg"
          {...register('email', {
            required: t(
              'features.login.components.LoginForm.emailEmptyErrorMsg',
            ),
            validate: validateEmail,
          })}
        />
        {formState.errors.email && (
          <FormErrorMessage>{formState.errors.email.message}</FormErrorMessage>
        )}
      </FormControl>
      <Stack
        direction={{ base: 'column', lg: 'row' }}
        spacing="1.5rem"
        align="center"
      >
        <Button isFullWidth isLoading={formState.isSubmitting} type="submit">
          {t('features.login.components.LoginForm.login')}
        </Button>
      </Stack>
    </form>
  )
}
```

login/index.ts
```ts
export * from './en-sg'
export * from './zh-sg'

export interface Login {
  components: {
    LoginForm: {
      onlyAvailableForPublicOfficers: string
      emailEmptyErrorMsg: string
      login: string
      haveAQuestion: string
    }
    OTPForm: {
      signin: string
      otpRequired: string
      otpLengthCheck: string
      otpTypeCheck: string
      otpFromEmail: string
    }
    SgidLoginButton: {
      forText: string
      selectAgenciesText: string
      loginText: string
      appText: string
    }
  }
  LoginPage: {
    slogan: string
    banner: string
    expiredSgIdSession: string
  }
  SelectProfilePage: {
    accountSelection: string
    manualLogin: string
    noWorkEmailHeader: string
    noWorkEmailBody: string
    noWorkEmailCta: string
    invalidWorkEmailHeader: string
    invalidWorkEmailBodyRestriction: string
    invalidWorkEmailBodyContact: string
    invalidWorkEmailCta: string
  }
}
```

login/en-sg.ts
```ts
import { Login } from '.'

export const enSG: Login = {
  LoginPage: {
    slogan: 'Build secure government forms in minutes',
    banner: 'You can now collect payments directly on your form!',
    expiredSgIdSession:
      'Your sgID login session has expired. Please login again.',
  },
  SelectProfilePage: {
    accountSelection: 'Choose an account to continue to FormSG',
    manualLogin: 'Or, login manually using email and OTP',
    noWorkEmailHeader: "Singpass login isn't available to you yet",
    noWorkEmailBody:
      'It is progressively being made available to agencies. In the meantime, please log in using your email address.',
    noWorkEmailCta: 'Back to login',
    invalidWorkEmailHeader: "You don't have access to this service",
    invalidWorkEmailBodyRestriction:
      'It may be available only to select agencies or authorised individuals. If you believe you should have access to this service, please',
    invalidWorkEmailBodyContact: 'contact us',
    invalidWorkEmailCta: 'Choose another account',
  },
  components: {
    LoginForm: {
      onlyAvailableForPublicOfficers:
        'Log in with a .gov.sg or other whitelisted email address',
      emailEmptyErrorMsg: 'Please enter an email address',
      login: 'Log in',
      haveAQuestion: 'Have a question?',
    },
    OTPForm: {
      signin: 'Sign in',
      otpRequired: 'OTP is required.',
      otpLengthCheck: 'Please enter a 6 digit OTP.',
      otpTypeCheck: 'Only numbers are allowed.',
      otpFromEmail: 'Enter OTP sent to {email}',
    },
    SgidLoginButton: {
      forText: 'For',
      selectAgenciesText: 'select agencies',
      loginText: 'Log in with',
      appText: 'app',
    },
  },
}
```