import React, { InputHTMLAttributes } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

type FormInputProps = {
  name: string
  label: string
} & InputHTMLAttributes<HTMLInputElement>

const InputForm = ({ name, label, ...props }: FormInputProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <Controller
      control={control}
      defaultValue=""
      name={name}
      render={({ field }) => (
        <div className="form-control mb-3">
          <label className="label">
            <span className="label-text text-base">{label}</span>
          </label>
          <input
            className="input input-bordered w-full"
            {...field}
            {...props}
          />
          {errors?.[name]?.message && (
            <label className="label">
              <p className="text-xs text-error">
                {errors?.[name]?.message?.toString()}
              </p>
            </label>
          )}
        </div>
      )}
    />
  )
}

export default InputForm
