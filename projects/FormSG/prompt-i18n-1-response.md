> https://chatgpt.com/share/8a9dd670-04e8-4815-9346-0b97de34f92e

```tsx
// FormFields/PublicFormSubmitButton.tsx

import { useTranslation } from 'react-i18next'
// ...

export const PublicFormSubmitButton = ({
  // ...
}: PublicFormSubmitButtonProps): JSX.Element => {
  const { t } = useTranslation()

  return (
    <Stack px={{ base: '1rem', md: 0 }} pt="2.5rem" pb="4rem">
      {/* ... */}
      <Button
        // ...
        loadingText={t('features.publicForm.components.PublicFormSubmitButton.loadingText')}
        onClick={isPaymentEnabled && !isPreview ? checkBeforeOpen : onSubmit}
      >
        <VisuallyHidden>{t('features.publicForm.components.PublicFormSubmitButton.visuallyHidden')}</VisuallyHidden>
        {preventSubmissionLogic
          ? t('features.publicForm.components.PublicFormSubmitButton.preventSubmission')
          : isPaymentEnabled
            ? t('features.publicForm.components.PublicFormSubmitButton.proceedToPay')
            : t('features.publicForm.components.PublicFormSubmitButton.submitNow')}
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


```ts
// public-form/index.ts

export * from './en-sg'

export interface PublicForm {
  errors: {
    // ...
  }
  components: {
    PublicFormSubmitButton: {
      loadingText: string
      visuallyHidden: string
      preventSubmission: string
      proceedToPay: string
      submitNow: string
    }
  }
}
```

```ts
// public-form/en-sg.ts

import { PublicForm } from '.'

export const enSG: PublicForm = {
  errors: {
    // ...
  },
  components: {
    PublicFormSubmitButton: {
      loadingText: 'Submitting',
      visuallyHidden: 'End of form.',
      preventSubmission: 'Submission disabled',
      proceedToPay: 'Proceed to pay',
      submitNow: 'Submit now'
    },
  },
}
```
