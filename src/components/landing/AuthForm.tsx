import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { useAuth } from '@/contexts/AuthContext'
import { createStyles, glassStyles, inputStyles } from '@/lib/styles'

const signUpSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
})

type SignUpForm = z.infer<typeof signUpSchema>

export default function AuthForm() {
  const { toast } = useToast()
  const { signInWithEmail, signInWithGoogle } = useAuth()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema)
  })

  const onSubmit = async (data: SignUpForm) => {
    try {
      await signInWithEmail(data.email, data.password)
      toast({
        title: "Welcome to your reality film",
        description: "Your journey begins now."
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      })
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
      toast({
        title: "Welcome to your reality film",
        description: "Your journey begins now."
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign in with Google. Please try again.",
        variant: "destructive"
      })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: 0.4 }}
      className="w-full max-w-md"
    >
      <div className={createStyles(
        glassStyles.panel,
        "rounded-2xl p-8 shadow-2xl"
      )}>
        <Button 
          variant="outline" 
          className={createStyles(
            "w-full mb-6",
            glassStyles.input,
            "hover:bg-white/25 text-white"
          )}
          onClick={handleGoogleSignIn}
        >
          Continue with Google
        </Button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/20"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className={createStyles(
              glassStyles.panel,
              "px-2 text-white/90"
            )}>
              or continue with email
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-white/90">
              Email address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className={createStyles(
                "mt-1",
                inputStyles.glass
              )}
              disabled={isSubmitting}
              {...register('email')}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="password" className="text-white/90">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              className={createStyles(
                "mt-1",
                inputStyles.glass
              )}
              disabled={isSubmitting}
              {...register('password')}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
            )}
          </div>

          <Button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#4A8ED5] hover:bg-[#4A8ED5]/90 text-white"
          >
            {isSubmitting ? 'Loading...' : (
              <>
                Begin Your Journey
                <ArrowRight className="ml-2 w-4 h-4" />
              </>
            )}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-white/90">
          By continuing, you agree to our{' '}
          <a href="#" className="text-[#4A8ED5] hover:underline">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="text-[#4A8ED5] hover:underline">Privacy Policy</a>
        </p>
      </div>
    </motion.div>
  )
}