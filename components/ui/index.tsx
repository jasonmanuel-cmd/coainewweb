/**
 * COAI design system primitives.
 *
 * Ported from the COAI Design System project (f69bc7bd-2cd1-4aa3-b7fd-cbfac65fa270).
 * Styling lives in ./ui.css — these components only pick class names, so the
 * doctrine (0-4px radii, hairline borders, no shadow theatrics) is enforced in
 * one place and cannot drift per-usage.
 */

import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes
} from "react";
import "./ui.css";

type ButtonVariant = "primary" | "secondary" | "ghost" | "inverse";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  block?: boolean;
  children: ReactNode;
  className?: string;
}

type ButtonProps = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> & { href?: undefined };

type ButtonLinkProps = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "className" | "href"> & { href: string };

function buttonClass({ variant = "primary", size = "md", block, className }: ButtonBaseProps): string {
  return [
    "ui-btn",
    `ui-btn--${variant}`,
    `ui-btn--${size}`,
    block ? "ui-btn--block" : "",
    className ?? ""
  ]
    .filter(Boolean)
    .join(" ");
}

/** Renders a `<button>`, or a link when `href` is supplied. */
export function Button(props: ButtonProps | ButtonLinkProps) {
  const { variant, size, block, children, className, ...rest } = props;
  const cls = buttonClass({ variant, size, block, className, children });

  if (typeof props.href === "string") {
    const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
    // tel:, mailto:, and external URLs must not go through the client router.
    const isRouted = href.startsWith("/") && !href.startsWith("//");
    if (isRouted) {
      return (
        <Link href={href} className={cls} {...anchorRest}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} className={cls} {...anchorRest}>
        {children}
      </a>
    );
  }

  const { href: _ignored, ...buttonRest } = rest as ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };
  return (
    <button type="button" className={cls} {...buttonRest}>
      {children}
    </button>
  );
}

export type TagKind = "leak" | "control" | "proof" | "info" | "neutral";

/** Squared status tab — LEAK FOUND / CONTROL INSTALLED / PROOF REQUIRED. */
export function Tag({ kind = "neutral", children }: { kind?: TagKind; children: ReactNode }) {
  return <span className={`ui-tag ui-tag--${kind}`}>{children}</span>;
}

interface CardProps {
  inverse?: boolean;
  /** Reserve for the single most important panel on a screen. */
  raised?: boolean;
  interactive?: boolean;
  children: ReactNode;
  className?: string;
}

export function Card({ inverse, raised, interactive, children, className }: CardProps) {
  const cls = [
    "ui-card",
    inverse ? "ui-card--inverse" : "",
    raised ? "ui-card--raised" : "",
    interactive ? "ui-card--interactive" : "",
    className ?? ""
  ]
    .filter(Boolean)
    .join(" ");
  return <div className={cls}>{children}</div>;
}

export function StatBlock({
  value,
  label,
  inverse
}: {
  value: string;
  label: string;
  inverse?: boolean;
}) {
  return (
    <div className={inverse ? "ui-stat ui-stat--inverse" : "ui-stat"}>
      <div className="ui-stat__value">{value}</div>
      <div className="ui-stat__label">{label}</div>
    </div>
  );
}

interface FieldProps {
  label: string;
  hint?: string;
  error?: string;
  inverse?: boolean;
  /** Tabular mono numerals — use for call counts, dollar values, durations. */
  mono?: boolean;
}

export function Input({
  label,
  hint,
  error,
  inverse,
  mono,
  id,
  ...rest
}: FieldProps & InputHTMLAttributes<HTMLInputElement>) {
  const fieldId = id ?? `f-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  const describedBy = error ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined;
  return (
    <div className={inverse ? "ui-field ui-field--inverse" : "ui-field"}>
      <label className="ui-field__label" htmlFor={fieldId}>
        {label}
      </label>
      <input
        id={fieldId}
        className={mono ? "ui-field__control ui-field__control--mono" : "ui-field__control"}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        {...rest}
      />
      {hint && !error && (
        <span className="ui-field__hint" id={`${fieldId}-hint`}>
          {hint}
        </span>
      )}
      {error && (
        <span className="ui-field__error" id={`${fieldId}-error`}>
          {error}
        </span>
      )}
    </div>
  );
}

export function Select({
  label,
  hint,
  error,
  inverse,
  id,
  children,
  ...rest
}: FieldProps & SelectHTMLAttributes<HTMLSelectElement>) {
  const fieldId = id ?? `f-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  const describedBy = error ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined;
  return (
    <div className={inverse ? "ui-field ui-field--inverse" : "ui-field"}>
      <label className="ui-field__label" htmlFor={fieldId}>
        {label}
      </label>
      <select
        id={fieldId}
        className="ui-field__control"
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        {...rest}
      >
        {children}
      </select>
      {hint && !error && (
        <span className="ui-field__hint" id={`${fieldId}-hint`}>
          {hint}
        </span>
      )}
      {error && (
        <span className="ui-field__error" id={`${fieldId}-error`}>
          {error}
        </span>
      )}
    </div>
  );
}

export function ComparisonTable({
  columns,
  rows,
  caption
}: {
  columns: readonly string[];
  rows: readonly (readonly string[])[];
  caption?: string;
}) {
  return (
    <div className="ui-table-scroll">
      <table className="ui-table">
        {caption && <caption className="ui-field__hint">{caption}</caption>}
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c} scope="col">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]}>
              {row.map((cell, i) => (
                <td key={`${row[0]}-${i}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
