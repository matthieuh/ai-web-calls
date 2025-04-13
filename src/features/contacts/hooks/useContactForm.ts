import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { lazy } from "react";
import { fieldContext, formContext } from "~/hooks/useFormContext";

const { useFieldContext } = createFormHookContexts();

const TextField = lazy(() => import('~/components/form/TextField').then(m => ({ default: m.TextField })))
const SubmitButton = lazy(() => import('~/components/form/SubmitButton').then(m => ({ default: m.SubmitButton })))

export const { useAppForm: useContactForm } = createFormHook({
  fieldComponents: {
    TextField,
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
})
