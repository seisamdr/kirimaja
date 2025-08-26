import { usePermission } from "@/hooks/use-permission";
import { type ReactNode } from "react";

interface PermissionGuardProps {
  permission?: string;
  permissions?: string[];
  children: ReactNode;
  fallback?: ReactNode;
}

export function PermissionGuard({
  permission,
  permissions,
  children,
  fallback = null,
}: PermissionGuardProps) {
  const { hasPermission, hasAnyPermission } = usePermission();

  if (!permission && !permissions) {
    return <>{children}</>;
  }

  if (permission) {
    return hasPermission(permission) ? <>{children}</> : <>{fallback}</>;
  }

  if (permissions) {
    return hasAnyPermission(permissions) ? <>{children}</> : <>{fallback}</>;
  }

  return <>{fallback}</>;
}
