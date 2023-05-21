import React, { ComponentType, InputHTMLAttributes } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { IconBaseProps, IconType } from 'react-icons'

type FormInputProps = {
  name: string
  Icon: ComponentType<IconBaseProps>
} & InputHTMLAttributes<HTMLInputElement>

const InputForm = ({ name, Icon, ...props }: FormInputProps) => {
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
          <div className="flex items-center">
            <div>
              <Icon size={25} className="fill-primary" />
            </div>
            <input
              className="input border-t-0 border-l-0 border-r-0 rounded-none border-b-[1px] border-primary w-full focus:outline-none"
              {...field}
              {...props}
            />
          </div>
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
