export default function Dado({ valor }) {
  // Se o dado ainda não foi jogado nessa rodada, valor vem como null
  // e mostramos uma imagem de "dado vazio" (com uma interrogação).
  const nomeArquivo = valor ? `dado-${valor}` : 'dado-vazio';

  return (
    <img
      src={`/dados/${nomeArquivo}.svg`}
      alt={valor ? `Dado com valor ${valor}` : 'Dado ainda não jogado'}
      className="dado-imagem"
      width={64}
      height={64}
    />
  );
}
