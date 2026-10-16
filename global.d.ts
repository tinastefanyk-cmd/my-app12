declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}

declare module '*.module.css' {
  const classes: Record<string, string>;
  export default classes;
}

declare module '@/global.css' {
  const content: Record<string, string>;
  export default content;
}
