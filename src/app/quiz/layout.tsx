/**
 * La presentación bloquea el scroll en globals.css; el juego es una página
 * web común y tiene que poder scrollearse, sobre todo en el celular.
 */
export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`html, body { overflow: auto !important; height: auto !important; }`}</style>
      {children}
    </>
  );
}
