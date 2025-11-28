import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Briefcase, Users } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const signUpSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  company_name: z.string().optional(),
});

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [userType, setUserType] = useState<"employer" | "job_seeker">("job_seeker");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    full_name: "",
    company_name: "",
  });
  const [loading, setLoading] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [isPasswordRecovery, setIsPasswordRecovery] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signUp, signIn } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is coming from password reset email
    supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setIsPasswordRecovery(true);
      }
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const validated = signUpSchema.parse(formData);
        const { error } = await signUp(validated.email, validated.password, {
          user_type: userType,
          full_name: validated.full_name,
          company_name: validated.company_name || undefined,
        });

        if (error) throw error;

        toast({
          title: "Account created!",
          description: "Welcome to HireHub. Redirecting to dashboard...",
        });
        navigate("/");
      } else {
        const validated = signInSchema.parse({
          email: formData.email,
          password: formData.password,
        });
        const { error } = await signIn(validated.email, validated.password);

        if (error) throw error;

        toast({
          title: "Welcome back!",
          description: "Successfully signed in.",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetLoading(true);

    try {
      const emailSchema = z.string().email("Invalid email address");
      const validated = emailSchema.parse(resetEmail);

      const { error } = await supabase.auth.resetPasswordForEmail(validated, {
        redirectTo: `${window.location.origin}/auth`,
      });

      if (error) throw error;

      toast({
        title: "Password reset email sent!",
        description: "Check your email for a link to reset your password.",
      });
      setShowResetDialog(false);
      setResetEmail("");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to send reset email. Please try again.",
      });
    } finally {
      setResetLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords don't match",
        description: "Please make sure both passwords are the same.",
      });
      return;
    }

    if (newPassword.length < 6) {
      toast({
        variant: "destructive",
        title: "Password too short",
        description: "Password must be at least 6 characters.",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      toast({
        title: "Password updated!",
        description: "Your password has been successfully changed.",
      });
      
      setIsPasswordRecovery(false);
      navigate("/dashboard");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update password. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Show password recovery form if user clicked reset link
  if (isPasswordRecovery) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-subtle px-4">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-lg shadow-xl p-8 border border-border">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary">
                  <Briefcase className="h-6 w-6 text-primary-foreground" />
                </div>
                <h1 className="text-2xl font-bold">HireHub</h1>
              </div>
              <h2 className="text-xl font-semibold text-foreground">
                Set New Password
              </h2>
              <p className="text-muted-foreground mt-2">
                Enter your new password below
              </p>
            </div>

            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
                    <span>Updating...</span>
                  </div>
                ) : (
                  "Update Password"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle px-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-lg shadow-xl p-8 border border-border">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary">
                <Briefcase className="h-6 w-6 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold">HireHub</h1>
            </div>
            <h2 className="text-xl font-semibold text-foreground">
              {isSignUp ? "Create your account" : "Welcome back"}
            </h2>
            <p className="text-muted-foreground mt-2">
              {isSignUp
                ? "Join thousands of professionals finding their perfect match"
                : "Sign in to access your dashboard"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <>
                <div className="space-y-3">
                  <Label>I am a...</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setUserType("job_seeker")}
                      className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-smooth ${
                        userType === "job_seeker"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <Users className="h-6 w-6" />
                      <span className="font-medium text-sm">Job Seeker</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setUserType("employer")}
                      className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-smooth ${
                        userType === "employer"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <Briefcase className="h-6 w-6" />
                      <span className="font-medium text-sm">Employer</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="full_name">Full Name</Label>
                  <Input
                    id="full_name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.full_name}
                    onChange={(e) =>
                      setFormData({ ...formData, full_name: e.target.value })
                    }
                    required
                  />
                </div>

                {userType === "employer" && (
                  <div className="space-y-2">
                    <Label htmlFor="company_name">Company Name</Label>
                    <Input
                      id="company_name"
                      type="text"
                      placeholder="Acme Inc."
                      value={formData.company_name}
                      onChange={(e) =>
                        setFormData({ ...formData, company_name: e.target.value })
                      }
                    />
                  </div>
                )}
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                {!isSignUp && (
                  <Dialog open={showResetDialog} onOpenChange={setShowResetDialog}>
                    <DialogTrigger asChild>
                      <button
                        type="button"
                        className="text-xs text-primary hover:underline"
                      >
                        Forgot password?
                      </button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Reset your password</DialogTitle>
                        <DialogDescription>
                          Enter your email address and we'll send you a link to reset your password.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handlePasswordReset} className="space-y-4 mt-4">
                        <div className="space-y-2">
                          <Label htmlFor="reset-email">Email</Label>
                          <Input
                            id="reset-email"
                            type="email"
                            placeholder="you@example.com"
                            value={resetEmail}
                            onChange={(e) => setResetEmail(e.target.value)}
                            required
                          />
                        </div>
                        <Button type="submit" className="w-full" disabled={resetLoading}>
                          {resetLoading ? (
                            <div className="flex items-center gap-2">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
                              <span>Sending...</span>
                            </div>
                          ) : (
                            "Send reset link"
                          )}
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
                  <span>Processing...</span>
                </div>
              ) : isSignUp ? (
                "Create Account"
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full mt-4"
              onClick={async () => {
                const { error } = await supabase.auth.signInWithOAuth({
                  provider: 'google',
                  options: {
                    redirectTo: `${window.location.origin}/`,
                  },
                });
                if (error) {
                  toast({
                    title: "Error",
                    description: error.message,
                    variant: "destructive",
                  });
                }
              }}
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </Button>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-muted-foreground hover:text-primary transition-smooth"
            >
              {isSignUp ? (
                <>
                  Already have an account?{" "}
                  <span className="font-medium text-primary">Sign in</span>
                </>
              ) : (
                <>
                  Don't have an account?{" "}
                  <span className="font-medium text-primary">Create new user</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;