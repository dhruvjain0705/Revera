"use client";

import React, { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Eye, EyeOff, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type Role = "buyer" | "seller";

// Configure which email domains are allowed as "official"
const ALLOWED_OFFICIAL_DOMAINS = ["yourcompany.com", "partner.org"]; // <-- replace with your real domains

export default function AuthDarkModal({ children }: { children?: React.ReactNode }) {
  const [showSignInPassword, setShowSignInPassword] = useState(false);
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState<Role>("buyer");
  const { toast } = useToast();
  const [tab, setTab] = useState<"signin" | "signup">("signin");

  // image upload state
  const [sellerImage, setSellerImage] = useState<File | null>(null);
  const [sellerImagePreview, setSellerImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onSelectSellerImage = (file?: File | null) => {
    if (!file) return;
    setSellerImage(file);
    const url = URL.createObjectURL(file);
    setSellerImagePreview(url);
  };

  const onClearSellerImage = () => {
    setSellerImage(null);
    if (sellerImagePreview) {
      URL.revokeObjectURL(sellerImagePreview);
      setSellerImagePreview(null);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  function isOfficialEmail(email: string) {
    const parts = email.split("@");
    if (parts.length !== 2) return false;
    const domain = parts[1].toLowerCase();
    return ALLOWED_OFFICIAL_DOMAINS.includes(domain);
  }

  // --- Sign in using your backend ---
  const handleSignIn = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const form = e?.currentTarget as HTMLFormElement | undefined;
    if (!form) return;

    const fd = new FormData(form);
    const email = (fd.get("email") as string) || "";

    // Optionally enforce official email for signin
    if (!isOfficialEmail(email)) {
      toast({ title: "Use official email", description: "Please sign in with your official company email." });
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        body: fd,
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.message || "Sign in failed");

      toast({ title: "Signed in", description: json.message || "Welcome back" });
      // redirect or close modal depending on your flow
      if (json.redirect) window.location.href = json.redirect;
    } catch (err: any) {
      toast({ title: "Sign in error", description: err.message || String(err) });
    } finally {
      setIsLoading(false);
    }
  };

  // --- Sign up using your backend ---
  const handleSignUp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const form = e?.currentTarget as HTMLFormElement | undefined;
    if (!form) return;

    const fd = new FormData(form);
    const email = (fd.get("email") as string) || "";

    // Optionally require official email for signup
    if (!isOfficialEmail(email)) {
      toast({ title: "Use official email", description: "Please sign up with your official company email." });
      return;
    }

    // append seller image if present
    if (sellerImage) {
      fd.append("avatar", sellerImage, sellerImage.name);
    }

    // Add role explicitly
    fd.append("role", role);

    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: fd,
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.message || "Sign up failed");

      toast({ title: "Account created", description: json.message || `Registered as ${role}.` });
      if (json.redirect) window.location.href = json.redirect;
    } catch (err: any) {
      toast({ title: "Sign up error", description: err.message || String(err) });
    } finally {
      setIsLoading(false);
    }
  };

  // --- Google OAuth redirect ---
  // This will navigate the browser to your backend route that starts the OAuth flow.
  const handleGoogleAuth = (provider = "google") => {
    // Open in same tab so cookies and redirects behave normally.
    // we pass role so the backend can attach role to session/flow if needed
    const redirectTo = `/api/auth/${provider}?role=${role}`;
    window.location.href = redirectTo;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children ?? <DefaultTrigger />}</DialogTrigger>

      <DialogContent className="sm:max-w-xl w-full max-w-full p-0 overflow-hidden rounded-2xl bg-[#07060a] text-white shadow-[0_0_40px_rgba(124,58,237,0.3)]">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="text-center text-3xl font-extrabold text-white drop-shadow-[0_0_8px_rgba(124,58,237,0.8)]">
            Welcome to Revéra
          </DialogTitle>
        </DialogHeader>

        {/* make content scrollable and constrained so it never overflows screen */}
        <div className="max-h-[72vh] overflow-y-auto px-6 pb-8">
          {/* Role toggle */}
          <div className="mt-4 flex items-center justify-center gap-3">
            <div className="inline-flex rounded-md overflow-hidden bg-black border border-[rgba(255,255,255,0.1)]">
              <button
                onClick={() => setRole("buyer")}
                className={cn(
                  "px-4 py-1 text-sm",
                  role === "buyer"
                    ? "bg-[rgba(124,58,237,0.9)] text-white shadow-[0_0_8px_rgba(124,58,237,0.8)]"
                    : "text-[rgba(255,255,255,0.7)]"
                )}
              >
                Buyer
              </button>
              <button
                onClick={() => setRole("seller")}
                className={cn(
                  "px-4 py-1 text-sm",
                  role === "seller"
                    ? "bg-[rgba(77,163,255,0.9)] text-white shadow-[0_0_8px_rgba(77,163,255,0.8)]"
                    : "text-[rgba(255,255,255,0.7)]"
                )}
              >
                Seller
              </button>
            </div>
          </div>

          {/* Main card */}
          <div className="mt-6">
            {/* Tabs */}
            <div className="flex items-center gap-3 bg-black p-1 rounded-lg border border-[rgba(255,255,255,0.08)]">
              <button
                onClick={() => setTab("signin")}
                className={cn(
                  "flex-1 text-sm py-2 rounded-md transition",
                  tab === "signin"
                    ? "bg-[rgba(124,58,237,0.15)] text-white font-semibold shadow-[0_0_6px_rgba(124,58,237,0.6)]"
                    : "text-[rgba(255,255,255,0.65)]"
                )}
              >
                Sign In
              </button>
              <button
                onClick={() => setTab("signup")}
                className={cn(
                  "flex-1 text-sm py-2 rounded-md transition",
                  tab === "signup"
                    ? "bg-[rgba(124,58,237,0.15)] text-white font-semibold shadow-[0_0_6px_rgba(124,58,237,0.6)]"
                    : "text-[rgba(255,255,255,0.65)]"
                )}
              >
                Sign Up
              </button>
            </div>

            <div className="mt-6">
              {tab === "signin" ? (
                <form onSubmit={handleSignIn} className="space-y-5">
                  <InputWithIcon
                    name="email"
                    icon={<Mail className="h-4 w-4" />}
                    placeholder="you@yourcompany.com"
                    type="email"
                  />
                  <PasswordInput
                    name="password"
                    show={showSignInPassword}
                    toggle={() => setShowSignInPassword(!showSignInPassword)}
                    placeholder="Enter password"
                  />

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-violet-600 to-blue-500 text-white font-bold shadow-[0_0_12px_rgba(124,58,237,0.6)] hover:shadow-[0_0_20px_rgba(124,58,237,0.9)]"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : `Sign in as ${role}`}
                  </Button>

                  {/* Divider */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-[rgba(255,255,255,0.15)]" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-[#07060a] px-2 text-[rgba(255,255,255,0.6)]">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  {/* Social buttons styled like Buy page */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => handleGoogleAuth("google")}
                      className="w-full rounded-md px-4 py-2 bg-[rgba(10,10,12,0.6)] border border-[rgba(255,255,255,0.08)] text-white hover:shadow-[0_0_15px_rgba(124,58,237,0.3)] hover:bg-[rgba(124,58,237,0.15)] transition"
                    >
                      Sign in with Google
                    </button>
                    <button
                      type="button"
                      onClick={() => handleGoogleAuth("facebook")}
                      className="w-full rounded-md px-4 py-2 bg-[rgba(10,10,12,0.6)] border border-[rgba(255,255,255,0.08)] text-white hover:shadow-[0_0_15px_rgba(77,163,255,0.3)] hover:bg-[rgba(77,163,255,0.15)] transition"
                    >
                      Sign in with Facebook
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleSignUp} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input
                      name="firstName"
                      required
                      placeholder="First"
                      className="bg-black text-white border border-[rgba(255,255,255,0.15)]"
                    />
                    <Input
                      name="lastName"
                      required
                      placeholder="Last"
                      className="bg-black text-white border border-[rgba(255,255,255,0.15)]"
                    />
                  </div>

                  <InputWithIcon
                    name="email"
                    icon={<Mail className="h-4 w-4" />}
                    placeholder="you@yourcompany.com"
                    type="email"
                  />
                  <InputWithIcon
                    name="phone"
                    icon={<Phone className="h-4 w-4" />}
                    placeholder="+91 98765 43210"
                    type="tel"
                  />

                  {/* Seller-specific box: looks similar to Buyer but with extra fields */}
                  {role === "seller" && (
                    <div className="mt-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-lg p-4">
                      <div className="flex items-start gap-4">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-white">Seller profile</h4>
                          <p className="text-xs text-[rgba(255,255,255,0.6)] mt-1">Add business details and a profile image so buyers know who they're dealing with.</p>

                          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <Input
                              name="business"
                              placeholder="Business name"
                              className="bg-black text-white border border-[rgba(255,255,255,0.12)]"
                            />
                            <Input
                              name="taxId"
                              placeholder="GST / Tax ID"
                              className="bg-black text-white border border-[rgba(255,255,255,0.12)]"
                            />
                          </div>

                          <div className="mt-3 flex items-center sm:items-start gap-3">
                            <div className="w-20 h-20 rounded-md border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.02)] flex items-center justify-center overflow-hidden flex-shrink-0">
                              {sellerImagePreview ? (
                                <img
                                  src={sellerImagePreview}
                                  alt="seller preview"
                                  className="object-cover w-full h-full"
                                />
                              ) : (
                                <div className="text-[rgba(255,255,255,0.45)] text-xs text-center px-2">
                                  Upload image
                                </div>
                              )}
                            </div>

                            <div className="flex-1 min-w-0">
                              <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => onSelectSellerImage(e.target.files?.[0] ?? null)}
                              />

                              <div className="flex gap-2">
                                <button
                                  type="button"
                                  onClick={() => fileInputRef.current?.click()}
                                  className="rounded-md px-3 py-2 bg-[rgba(10,10,12,0.6)] border border-[rgba(255,255,255,0.08)] text-white hover:shadow-[0_0_15px_rgba(124,58,237,0.25)] transition"
                                >
                                  Upload
                                </button>
                                <button
                                  type="button"
                                  onClick={onClearSellerImage}
                                  className="rounded-md px-3 py-2 bg-[rgba(10,10,12,0.4)] border border-[rgba(255,255,255,0.06)] text-[rgba(255,255,255,0.8)] hover:underline"
                                  disabled={!sellerImage}
                                >
                                  Remove
                                </button>
                              </div>

                              <p className="text-xs text-[rgba(255,255,255,0.6)] mt-2">Optional — helps buyers recognise you. JPG, PNG, max 5MB.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <PasswordInput
                    name="password"
                    show={showSignUpPassword}
                    toggle={() => setShowSignUpPassword(!showSignUpPassword)}
                    placeholder="Create a password"
                  />
                  <div className="flex items-center space-x-2 text-sm">
                    <input
                      required
                      name="terms"
                      type="checkbox"
                      className="rounded border-[rgba(255,255,255,0.25)]"
                    />
                    <span className="text-[rgba(255,255,255,0.85)]">
                      I agree to the{" "}
                      <button className="text-violet-400 hover:underline">Terms</button>{" "}
                      and{" "}
                      <button className="text-violet-400 hover:underline">Privacy</button>
                    </span>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-violet-600 to-blue-500 text-white font-bold shadow-[0_0_12px_rgba(124,58,237,0.6)] hover:shadow-[0_0_20px_rgba(124,58,237,0.9)]"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating account..." : `Create ${role} account`}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* Helpers */
function DefaultTrigger() {
  return (
    <button className="px-4 py-2 rounded-md bg-violet-600 text-white shadow-[0_0_8px_rgba(124,58,237,0.8)]">
      Sign in / Sign up
    </button>
  );
}

function InputWithIcon({
  icon,
  name,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { icon: React.ReactNode; name?: string }) {
  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgba(255,255,255,0.6)]">
        {icon}
      </div>
      <Input
        {...props}
        name={name}
        className="pl-10 bg-black text-white border border-[rgba(255,255,255,0.15)] placeholder:text-[rgba(255,255,255,0.5)] focus:ring-2 focus:ring-violet-500"
      />
    </div>
  );
}

function PasswordInput({
  show,
  toggle,
  placeholder,
  name,
}: {
  show: boolean;
  toggle: () => void;
  placeholder: string;
  name?: string;
}) {
  return (
    <div className="relative">
      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[rgba(255,255,255,0.6)]" />
      <Input
        type={show ? "text" : "password"}
        placeholder={placeholder}
        name={name}
        className="pl-10 pr-10 bg-black text-white border border-[rgba(255,255,255,0.15)] placeholder:text-[rgba(255,255,255,0.5)] focus:ring-2 focus:ring-violet-500"
      />
      <button
        type="button"
        onClick={toggle}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgba(255,255,255,0.6)] hover:text-white"
      >
        {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );
}
