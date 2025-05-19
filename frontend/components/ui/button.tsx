import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-70 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        // Variantes principales
        default: 'bg-primary text-white hover:bg-primary/90 shadow-sm',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive: 'bg-destructive text-white hover:bg-destructive/90',
        
        // Variantes de style
        outline: 'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        
        // Variantes personnalisées Darkei Elyahou
        gold: 'bg-gradient-to-r from-amber-500 to-yellow-400 text-white hover:from-amber-600 hover:to-yellow-500 shadow-md',
        'gold-outline': 'border border-amber-400 text-amber-600 hover:bg-amber-50',
        'gold-ghost': 'text-amber-600 hover:bg-amber-50',
        
        // Variante pour les actions importantes
        cta: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg',
        
        // Variante discrète
        subtle: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
      },
      size: {
        xs: 'h-7 px-2 text-xs',
        sm: 'h-9 px-3 text-sm',
        default: 'h-10 px-4 py-2',
        lg: 'h-12 px-6 text-base',
        xl: 'h-14 px-8 text-lg',
        icon: 'h-10 w-10',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        full: 'rounded-full',
      },
    },
    compoundVariants: [
      // Arrondis par défaut selon la taille
      {
        size: 'xs',
        className: 'rounded-md',
      },
      {
        size: 'sm',
        className: 'rounded-md',
      },
      {
        size: 'default',
        className: 'rounded-lg',
      },
      {
        size: 'lg',
        className: 'rounded-lg',
      },
      {
        size: 'xl',
        className: 'rounded-lg',
      },
      // Pleine largeur
      {
        fullWidth: true,
        className: 'w-full',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  disabled?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    asChild = false, 
    children,
    isLoading = false,
    leftIcon,
    rightIcon,
    fullWidth = false,
    rounded,
    disabled,
    ...props 
  }, ref) => {
    const Comp = asChild ? Slot : 'button';
    
    // Désactive les styles d'arrondi par défaut si une valeur personnalisée est fournie
    const buttonClass = cn(
      buttonVariants({ 
        variant, 
        size, 
        fullWidth,
        className,
      }),
      // Applique la classe d'arrondi personnalisée si fournie
      rounded && `rounded-${rounded}`,
      'relative',
      isLoading && 'cursor-wait',
    );
    
    // Si nous utilisons Slot (asChild), nous devons être sûrs de n'avoir qu'un seul enfant React
    if (asChild) {
      return (
        <Slot
          className={buttonClass}
          ref={ref}
          {...props}
        >
          {React.isValidElement(children) ? 
            // Clone l'élément enfant avec les propriétés nécessaires
            React.cloneElement(children, {
              ...children.props,  // Préserve toutes les props existantes
              // Ajoute disabled si nécessaire (compatible avec les éléments HTML standard)
              ...(isLoading || disabled) ? { disabled: true } : {},
              // Préserve la className et ajoute nos styles
              className: cn(
                children.props.className,
                'inline-flex items-center justify-center gap-2'
              ),
              // Remplace les enfants de l'élément cloné
              children: (
                <>
                  {isLoading && (
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  )}
                  <span 
                    className={cn(
                      'inline-flex items-center justify-center gap-2',
                      isLoading && 'invisible',
                    )}
                  >
                    {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
                    {children.props.children}
                    {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
                  </span>
                </>
              ),
            } as React.HTMLAttributes<HTMLElement>)
            : children
          }
        </Slot>
      )
    }
    
    // Version standard avec button
    return (
      <button
        className={buttonClass}
        ref={ref}
        disabled={isLoading || disabled}
        {...props}
      >
        {isLoading && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        )}
        <span 
          className={cn(
            'inline-flex items-center justify-center gap-2',
            isLoading && 'invisible',
          )}
        >
          {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
        </span>
      </button>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
