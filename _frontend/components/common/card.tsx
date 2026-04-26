type CardProps = {
    children: React.ReactNode;
    className?: string;
    wide?: boolean;
}

export default function Card({ children, className = "", wide = false }: CardProps) {
    return (
        <div className={`
        mx-auto 
        w-full 
        ${wide ? "max-w-80%" : "max-w-5xl"}
        rounded-xl 
        border
        shadow-sm
        border-zinc-300
        bg-white p-4
        text-zinc-900
        dark:bg-zinc-900
        dark:text-zinc-100
        dark:border-zinc-700
        ${className}`}>
            {children}
        </div>
    )
}