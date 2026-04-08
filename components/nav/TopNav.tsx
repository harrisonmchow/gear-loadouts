"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Backpack, GitCompareArrows, ShoppingCart, Search, User, LogOut, Globe } from "lucide-react";

const navItems = [
  { href: "/loadout", label: "Loadout", icon: Backpack },
  { href: "/items", label: "Items", icon: Search },
  { href: "/upgrades", label: "Upgrades", icon: GitCompareArrows },
  { href: "/marketplace", label: "Marketplace", icon: ShoppingCart },
];

export function TopNav() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-6xl items-center px-4 sm:px-6 lg:px-8">
        <Link href="/loadout" className="mr-6 flex items-center gap-2 font-semibold">
          TrailKit
        </Link>
        <nav className="flex items-center gap-1">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "gap-2",
                  pathname.startsWith(item.href) && "bg-accent"
                )}
              >
                <item.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </Button>
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          {session?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={session.user.image ?? undefined} />
                    <AvatarFallback>
                      {(session.user.name ?? "U")[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline">{session.user.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="flex items-center gap-2 text-xs font-normal text-muted-foreground">
                  <Globe className="h-3 w-3" />
                  Region
                </DropdownMenuLabel>
                <DropdownMenuItem disabled className="justify-between">
                  Australia (AUD)
                  <Badge variant="secondary" className="ml-2 text-[10px]">
                    Active
                  </Badge>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/login" })}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button size="sm">Sign in</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
