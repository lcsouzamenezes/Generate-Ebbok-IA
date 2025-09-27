import { Ebook } from '../types';

export const demoEbook: Ebook = {
  title: [
    { 
      id: 'main-title-1', 
      tag: 'h1', 
      content: 'Jardinagem de Apartamento para Iniciantes', 
      styles: { fontFamily: 'serif', fontSize: '3.5rem', textAlign: 'left', top: '70%', left: '8%', color: 'white', textShadow: '2px 2px 8px rgba(0,0,0,0.8)'},
      draggable: true,
    }
  ],
  author: [
    {
      id: 'author-1',
      tag: 'p',
      content: 'Gerado por IA',
      styles: { fontFamily: 'sans-serif', fontSize: '1.5rem', textAlign: 'center' }
    }
  ],
  coverImagePrompt: 'A vibrant and lush balcony garden in a modern apartment, overflowing with various green plants, herbs, and a few colorful flowers. A watering can is resting on the side. The style is a cozy, sun-drenched digital painting.',
  coverImageUrl: 'https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png',
  chapters: [
    {
      title: [{ id: 'ch-title-0', tag: 'h2', content: 'Escolhendo suas Primeiras Plantas', styles: { fontFamily: 'serif', fontSize: '2.5rem', textAlign: 'left' } }],
      contentPrompt: 'Um guia para iniciantes sobre como escolher as plantas certas para um apartamento, considerando luz, espaço e cuidado.',
      imagePrompt: 'A close-up shot of a person\'s hands gently holding a small potted succulent, with a bright, sunny apartment window in the background. The mood is hopeful and nurturing. Shallow depth of field.',
      imageUrl: 'https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png',
      content: [
        { id: 'c0-p0', tag: 'p', content: 'Escolher as plantas certas é o primeiro e <em>mais importante</em> passo para criar um jardim de sucesso em seu apartamento. Nem todas as plantas são criadas iguais, e as condições dentro de casa podem ser desafiadoras.', styles: {} },
        { id: 'c0-h1', tag: 'h3', content: 'Luz: A Chave de Tudo', styles: {} },
        { id: 'c0-p1', tag: 'p', content: 'Observe suas janelas. Elas recebem sol direto? Por quantas horas? Janelas voltadas para o norte recebem menos luz, ideais para plantas como Zamioculcas e Espadas-de-são-jorge. Janelas voltadas para o sul são perfeitas para suculentas e cactos que amam sol.', styles: {} },
        { id: 'c0-h2', tag: 'h3', content: 'Espaço e Tamanho', styles: {} },
        { id: 'c0-p2', tag: 'p', content: 'Considere o tamanho final da planta. Uma pequena muda de Ficus lyrata pode parecer perfeita, mas ela pode crescer e tomar sua sala de estar! Para espaços pequenos, opte por plantas de crescimento lento ou vertical, como a Jiboia ou o Cacto-macarrão.', styles: {} },
      ]
    },
    {
      title: [{ id: 'ch-title-1', tag: 'h2', content: 'Vasos, Terra e Irrigação', styles: { fontFamily: 'serif', fontSize: '2.5rem', textAlign: 'left' } }],
      contentPrompt: 'Instruções sobre os tipos de vasos, a mistura de terra correta e a frequência de irrigação para plantas de interior.',
      imagePrompt: 'An aesthetically pleasing flat lay of various terracotta pots of different sizes, a bag of potting soil, a small trowel, and a stylish watering can on a wooden tabletop. The lighting is bright and clean.',
      imageUrl: 'https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png',
      content: [
        { id: 'c1-p0', tag: 'p', content: 'O vaso não é apenas um item decorativo; é a casa da sua planta. A escolha correta é <em>fundamental</em> para a saúde das raízes.', styles: {} },
        { id: 'c1-p1', tag: 'p', content: 'Vasos com furos de drenagem são obrigatórios. Eles impedem que a água se acumule no fundo, o que pode causar o apodrecimento das raízes, um dos problemas mais comuns para jardineiros de primeira viagem.', styles: {} },
        { id: 'c1-h1', tag: 'h3', content: 'A Terra Certa', styles: {} },
        { id: 'c1-p2', tag: 'p', content: 'Não use terra do seu quintal! A terra para vasos comprada em lojas é formulada para ser leve, arejada e reter a quantidade certa de umidade. Existem misturas específicas para suculentas, orquídeas e outras plantas com necessidades especiais.', styles: {} },
        { id: 'c1-h2', tag: 'h3', content: 'Quando Regar?', styles: {} },
        { id: 'c1-p3', tag: 'p', content: 'A regra de ouro é: <em>verifique a umidade</em> do solo antes de regar. Enfie o dedo cerca de 2-3 cm na terra. Se sair seco, é hora de regar. Se sair úmido, espere mais um pouco. É mais fácil salvar uma planta com sede do que uma planta afogada.', styles: {} },
      ]
    },
    {
      title: [{ id: 'ch-title-2', tag: 'h2', content: 'Manutenção e Cuidados Básicos', styles: { fontFamily: 'serif', fontSize: '2.5rem', textAlign: 'left' } }],
      contentPrompt: 'Dicas sobre adubação, poda e como lidar com pragas comuns em plantas de apartamento.',
      imagePrompt: 'A person is carefully inspecting the leaves of a large Monstera deliciosa plant for pests, holding a small spray bottle. The scene is calm and focused, highlighting the act of caring for the plant.',
      imageUrl: 'https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png',
      content: [
        { id: 'c2-p0', tag: 'p', content: 'Suas plantas precisam de mais do que apenas água e luz para prosperar. A manutenção regular garante que elas cresçam fortes e saudáveis.', styles: {} },
        { id: 'c2-h1', tag: 'h3', content: 'Alimentando suas Plantas', styles: {} },
        { id: 'c2-p1', tag: 'p', content: 'A maioria das plantas de interior se beneficia de fertilizantes durante a primavera e o verão, suas estações de crescimento. Use um fertilizante líquido balanceado, diluído à metade da força recomendada, uma vez por mês.', styles: {} },
        { id: 'c2-h2', tag: 'h3', content: 'Podar para Crescer', styles: {} },
        { id: 'c2-p2', tag: 'p', content: 'A poda pode parecer assustadora, mas é uma ótima maneira de incentivar um crescimento mais cheio e remover folhas amareladas ou mortas. Use sempre uma tesoura limpa e afiada.', styles: {} },
        { id: 'c2-p3', tag: 'p', content: '<em>Mantenha um Registro</em>: Anotar quando você regou e adubou pode ajudar a criar uma rotina e a entender melhor as necessidades de cada uma de suas plantas. É um hábito simples que faz uma grande diferença.', styles: {} },
      ]
    }
  ]
};
