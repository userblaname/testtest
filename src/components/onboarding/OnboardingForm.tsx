import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Film, ArrowRight, ArrowLeft } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { UserProfileSchema, type UserProfile } from '@/lib/types'

interface OnboardingFormProps {
  onComplete: (profile: UserProfile) => void
}

const steps = [
  {
    id: 'name',
    title: 'Welcome to Your Reality Film',
    description: "Let us begin with your name",
    fields: ['name']
  },
  {
    id: 'experience',
    title: 'Your Reality Transurfing Journey',
    description: 'Tell us about your experience',
    fields: ['rtExperience']
  },
  {
    id: 'books',
    title: 'Reality Transurfing Books',
    description: 'Which books have you explored?',
    fields: ['booksRead']
  },
  {
    id: 'focus',
    title: 'Your Current Focus',
    description: 'What aspect of your reality needs attention?',
    fields: ['realityFocus', 'focusDetails']
  },
  {
    id: 'intention',
    title: 'Your Transformation Goal',
    description: 'What would you like to achieve?',
    fields: ['transformationIntent', 'intentDetails']
  }
]

const defaultValues: UserProfile = {
  name: "",
  rtExperience: "beginner",
  booksRead: [],
  realityFocus: "purpose",
  focusDetails: "",
  transformationIntent: "understanding",
  intentDetails: "",
  preferences: {
    theme: "dark",
    notifications: true
  }
}

export default function OnboardingForm({ onComplete }: OnboardingFormProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const { toast } = useToast()
  
  const form = useForm<UserProfile>({
    resolver: zodResolver(UserProfileSchema),
    defaultValues,
    mode: "onChange"
  })

  const { handleSubmit, control, formState: { errors, isSubmitting, isValid } } = form
  const progress = ((currentStep + 1) / steps.length) * 100

  const onSubmit = async (data: UserProfile) => {
    try {
      await onComplete(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save your profile. Please try again.",
        variant: "destructive"
      })
    }
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      handleSubmit(onSubmit)()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const currentStepConfig = steps[currentStep]
  const isLastStep = currentStep === steps.length - 1

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center p-4 bg-tufti-black"
    >
      <div className="w-full max-w-lg">
        <motion.div
          className="text-center mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Film className="w-12 h-12 text-tufti-red mx-auto mb-4 baroque-float" />
          <h1 className="text-3xl font-baroque text-tufti-white mb-2">
            {currentStepConfig.title}
          </h1>
          <p className="text-tufti-silver">{currentStepConfig.description}</p>
        </motion.div>

        <Progress value={progress} className="mb-8" />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-4"
            >
              {currentStepConfig.id === 'name' && (
                <div className="space-y-2">
                  <Label htmlFor="name">What shall I call you, dear one?</Label>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="name"
                        placeholder="Enter your name"
                        className="bg-tufti-black/50 border-tufti-red/20"
                        value={field.value || ""}
                      />
                    )}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">{errors.name.message}</p>
                  )}
                </div>
              )}

              {currentStepConfig.id === 'experience' && (
                <div className="space-y-2">
                  <Label>Your Reality Transurfing experience</Label>
                  <Controller
                    name="rtExperience"
                    control={control}
                    render={({ field }) => (
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="space-y-2"
                      >
                        {[
                          { value: 'newcomer', label: 'Just discovered' },
                          { value: 'aware', label: 'Aware of concepts' },
                          { value: 'beginner', label: 'Started practicing' },
                          { value: 'practitioner', label: 'Regular practice' },
                          { value: 'advanced', label: 'Advanced practitioner' }
                        ].map(({ value, label }) => (
                          <div key={value} className="flex items-center space-x-2">
                            <RadioGroupItem value={value} id={value} />
                            <Label htmlFor={value}>{label}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    )}
                  />
                </div>
              )}

              {currentStepConfig.id === 'books' && (
                <div className="space-y-2">
                  <Label>Books you have explored</Label>
                  <Controller
                    name="booksRead"
                    control={control}
                    render={({ field }) => (
                      <div className="space-y-2">
                        {[
                          { value: 'transurfing_1_5', label: 'Reality Transurfing I-V' },
                          { value: 'tufti', label: 'Tufti the Priestess' },
                          { value: 'other', label: 'Other Transurfing books' }
                        ].map(({ value, label }) => (
                          <div key={value} className="flex items-center space-x-2">
                            <Checkbox
                              id={value}
                              checked={field.value?.includes(value)}
                              onCheckedChange={(checked) => {
                                const newValue = checked
                                  ? [...(field.value || []), value]
                                  : (field.value || []).filter((b) => b !== value)
                                field.onChange(newValue)
                              }}
                            />
                            <Label htmlFor={value}>{label}</Label>
                          </div>
                        ))}
                      </div>
                    )}
                  />
                </div>
              )}

              {currentStepConfig.id === 'focus' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Primary focus area</Label>
                    <Controller
                      name="realityFocus"
                      control={control}
                      render={({ field }) => (
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="space-y-2"
                        >
                          {[
                            { value: 'purpose', label: 'Finding Purpose' },
                            { value: 'life_changes', label: 'Life Changes' },
                            { value: 'relationships', label: 'Relationships' },
                            { value: 'career', label: 'Career & Abundance' },
                            { value: 'balance', label: 'Inner Balance' }
                          ].map(({ value, label }) => (
                            <div key={value} className="flex items-center space-x-2">
                              <RadioGroupItem value={value} id={value} />
                              <Label htmlFor={value}>{label}</Label>
                            </div>
                          ))}
                        </RadioGroup>
                      )}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="focusDetails">Tell me more about your focus</Label>
                    <Controller
                      name="focusDetails"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          id="focusDetails"
                          placeholder="Share your thoughts..."
                          className="bg-tufti-black/50 border-tufti-red/20"
                          value={field.value || ""}
                        />
                      )}
                    />
                  </div>
                </div>
              )}

              {currentStepConfig.id === 'intention' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>What would you like to achieve?</Label>
                    <Controller
                      name="transformationIntent"
                      control={control}
                      render={({ field }) => (
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="space-y-2"
                        >
                          {[
                            { value: 'understanding', label: 'Deeper Understanding' },
                            { value: 'specific_situations', label: 'Handle Specific Situations' },
                            { value: 'practice', label: 'Regular Practice' },
                            { value: 'awareness', label: 'Expanded Awareness' },
                            { value: 'breaking_patterns', label: 'Break Free from Patterns' }
                          ].map(({ value, label }) => (
                            <div key={value} className="flex items-center space-x-2">
                              <RadioGroupItem value={value} id={value} />
                              <Label htmlFor={value}>{label}</Label>
                            </div>
                          ))}
                        </RadioGroup>
                      )}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="intentDetails">Any specific goals?</Label>
                    <Controller
                      name="intentDetails"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          id="intentDetails"
                          placeholder="Share your aspirations..."
                          className="bg-tufti-black/50 border-tufti-red/20"
                          value={field.value || ""}
                        />
                      )}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="text-tufti-silver hover:text-tufti-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            <Button
              type="button"
              onClick={nextStep}
              disabled={isSubmitting || !isValid}
              className="bg-tufti-red hover:bg-tufti-red/90"
            >
              {isLastStep ? 'Begin Journey' : 'Next'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  )
}