"use client"

import React, { useEffect, useRef, useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface AnimatedElementProps {
  children: ReactNode
  animation?: "fade-in" | "fade-up" | "fade-scale" | "fade-up-scale" | "none"
  delay?: number
  duration?: number
  threshold?: number
  className?: string
  once?: boolean
}

export function AnimatedElement({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 700,
  threshold = 0.15,
  className = "",
  once = true,
}: AnimatedElementProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Skip animation if user prefers reduced motion
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true)
            }, delay)

            if (once) {
              observer.unobserve(entry.target)
            }
          } else if (!once) {
            setIsVisible(false)
          }
        })
      },
      {
        threshold,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [delay, threshold, once])

  const getAnimationClass = () => {
    switch (animation) {
      case "fade-in":
        return "opacity-0 transition-opacity"
      case "fade-up":
        return "opacity-0 translate-y-8 transition-all"
      case "fade-scale":
        return "opacity-0 scale-95 transition-all"
      case "fade-up-scale":
        return "opacity-0 translate-y-8 scale-95 transition-all"
      default:
        return ""
    }
  }

  return (
    <div
      ref={ref}
      className={cn(getAnimationClass(), isVisible && "opacity-100 translate-y-0 scale-100", className)}
      style={{
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: "cubic-bezier(0.33, 1, 0.68, 1)",
        transitionDelay: `${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  )
}

export function AnimatedGroup({
  children,
  className = "",
  staggerDelay = 100,
  animation = "fade-up",
  baseDelay = 0,
  threshold = 0.15,
  duration = 700,
}: {
  children: ReactNode
  className?: string
  staggerDelay?: number
  animation?: "fade-in" | "fade-up" | "fade-scale" | "fade-up-scale" | "none"
  baseDelay?: number
  threshold?: number
  duration?: number
}) {
  const childrenArray = React.Children.toArray(children)

  return (
    <div className={className}>
      {childrenArray.map((child, index) => {
        if (!React.isValidElement(child)) return child

        return React.cloneElement(child as React.ReactElement<AnimatedElementProps>, {
          animation: child.props.animation || animation,
          delay: baseDelay + index * staggerDelay + (child.props.delay || 0),
          threshold: child.props.threshold || threshold,
          duration: child.props.duration || duration,
          key: index,
        })
      })}
    </div>
  )
}

interface AnimatedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  delay?: number
  duration?: number
  threshold?: number
  fill?: boolean
  sizes?: string
  priority?: boolean
}

export function AnimatedImage({
  src,
  alt,
  width,
  height,
  className = "",
  delay = 0,
  duration = 800,
  threshold = 0.15,
  fill = false,
  sizes,
  priority = false,
}: AnimatedImageProps) {
  return (
    <AnimatedElement
      animation="fade-scale"
      delay={delay}
      duration={duration}
      threshold={threshold}
      className={className}
    >
      {fill ? (
        <div className="relative w-full h-full overflow-hidden">
          <img
            src={src || "/placeholder.svg"}
            alt={alt}
            className="object-cover w-full h-full transition-transform duration-700 hover:scale-105"
            sizes={sizes}
          />
        </div>
      ) : (
        <img
          src={src || "/placeholder.svg"}
          alt={alt}
          width={width}
          height={height}
          className={`transition-transform duration-700 hover:scale-105 ${className}`}
        />
      )}
    </AnimatedElement>
  )
}

export function AnimatedTitle({
  children,
  className = "",
  delay = 0,
  as: Component = "h2",
}: {
  children: ReactNode
  className?: string
  delay?: number
  as?: React.ElementType
}) {
  return (
    <AnimatedElement animation="fade-up" delay={delay} duration={700} className={className}>
      <Component className={className}>{children}</Component>
    </AnimatedElement>
  )
}

export function AnimatedCard({
  children,
  className = "",
  delay = 0,
  duration = 800,
  threshold = 0.15,
}: {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  threshold?: number
}) {
  return (
    <AnimatedElement
      animation="fade-up-scale"
      delay={delay}
      duration={duration}
      threshold={threshold}
      className={`transform transition-all ${className}`}
    >
      {children}
    </AnimatedElement>
  )
}
