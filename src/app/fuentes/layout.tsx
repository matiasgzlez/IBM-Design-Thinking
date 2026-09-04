/**
 * La presentación bloquea el scroll en globals.css, pero esta página es una
 * página web común: acá tiene que poder scrollearse.
 */
export default function FuentesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`html, body { overflow: auto !important; height: auto !important; }`}</style>
      {children}
    </>
  );
}
