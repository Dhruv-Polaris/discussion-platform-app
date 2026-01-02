import Link from "next/link";
import { MessageSquareQuote, Github, Twitter, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-6xl px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group transition-opacity hover:opacity-90">
              <MessageSquareQuote className="size-6 text-primary transition-transform group-hover:scale-105" />
              <span className="font-bold text-xl">Discuss</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A community-driven platform for meaningful conversations. Join the discussion, share your ideas, and connect with others.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wide uppercase text-foreground">Navigation</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/topics" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Topics
                </Link>
              </li>
              <li>
                <Link href="/posts/top" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Top Posts
                </Link>
              </li>
              <li>
                <Link href="/topics/new" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Create Topic
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wide uppercase text-foreground">Community</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/guidelines" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Guidelines
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wide uppercase text-foreground">Connect</h3>
            <div className="flex gap-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="size-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="size-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="size-5" />
              </a>
              <a 
                href="mailto:hello@example.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Email"
              >
                <Mail className="size-5" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              Stay updated with the latest trends and discussions.
            </p>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            &copy; {new Date().getFullYear()} Discuss. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
