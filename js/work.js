const works = [
  {
    type: ['web'],
    renderText: ['Web'],
    url: '#nonoe',
    title: `모든 국민의\n재산권은 보장된다.`,
    date: '2023.11',
    desc1: `국회는 의원의 자격을 심사하며, 의원을 징계할 수 있다. 언론·출판은 타인의 명예나 권리 또는 공중도덕이나 사회윤리를 침해하여서는 아니된다.`,
    desc2: `The National Assembly shall examine the qualifications of members and may discipline them. The press or publication shall not infringe on the honor or rights of others, or public morality or social ethics.`,
    images: ['/flowline/assets/work_portfolio_01.jpg']
  },
  {
    type: ['app'],
    renderText: ['App'],
    url: '#nonoe',
    title: `언론·출판에 대한 허가나 검열과 집회·결사에 대한 허가는 인정되지 아니한다.`,
    date: '2023.11-2023.12',
    desc1: `헌법재판소의 장은 국회의 동의를 얻어 재판관중에서 대통령이 임명한다.`,
    desc2: `The head of the Constitutional Court is appointed by the President from among the judges with the consent of the National Assembly.`,
    images: ['/flowline/assets/work_portfolio_02.jpg']
  },
  {
    type: ['e-commerce', 'system'],
    renderText: ['E-Commerce', 'System Integration'],
    url: '#nonoe',
    title: `예비비는 총액으로 국회의 의결을 얻어야 한다.`,
    date: '2023.11',
    desc1: `정당의 설립은 자유이며, 복수정당제는 보장된다. 국가는 노인과 청소년의 복지향상을 위한 정책을 실시할 의무를 진다.`,
    desc2: `The establishment of a political party is free, and a multiparty system is guaranteed. The state is obligated o implement policies to improve the welfare of the elderly and adolescents.`,
    images: ['/flowline/assets/work_portfolio_03.jpg']
  },
  {
    type: ['e-commerce', 'system'],
    renderText: ['E-Commerce', 'System Integration'],
    url: '#nonoe',
    title: `경제질서는 창의를 존중함을 기본으로 한다.`,
    date: '2023.11- In progress',
    desc1: `정당의 설립은 자유이며, 복수정당제는 보장된다. 국가는 노인과 청소년의 복지향상을 위한 정책을 실시할 의무를 진다.`,
    desc2: `The establishment of a political party is free, and a multiparty system is guaranteed. The state is obligated o implement policies to improve the welfare of the elderly and adolescents.`,
    images: ['/flowline/assets/work_portfolio_04.jpg']
  },
  {
    type: ['web'],
    renderText: ['Web'],
    url: '#nonoe',
    title: `모든 국민의\n재산권은 보장된다.`,
    date: '2023.11',
    desc1: `국회는 의원의 자격을 심사하며, 의원을 징계할 수 있다. 언론·출판은 타인의 명예나 권리 또는 공중도덕이나 사회윤리를 침해하여서는 아니된다.`,
    desc2: `The National Assembly shall examine the qualifications of members and may discipline them. The press or publication shall not infringe on the honor or rights of others, or public morality or social ethics.`,
    images: ['/flowline/assets/work_portfolio_05.jpg']
  },
  {
    type: ['app'],
    renderText: ['App'],
    url: '#nonoe',
    title: `언론·출판에 대한 허가나 검열과 집회·결사에 대한 허가는 인정되지 아니한다.`,
    date: '2023.11-2023.12',
    desc1: `헌법재판소의 장은 국회의 동의를 얻어 재판관중에서 대통령이 임명한다.`,
    desc2: `The head of the Constitutional Court is appointed by the President from among the judges with the consent of the National Assembly.`,
    images: ['/flowline/assets/work_portfolio_06.jpg']
  },
  {
    type: ['e-commerce', 'system'],
    renderText: ['E-Commerce', 'System Integration'],
    url: '#nonoe',
    title: `예비비는 총액으로 국회의 의결을 얻어야 한다.`,
    date: '2023.11',
    desc1: `정당의 설립은 자유이며, 복수정당제는 보장된다. 국가는 노인과 청소년의 복지향상을 위한 정책을 실시할 의무를 진다.`,
    desc2: `The establishment of a political party is free, and a multiparty system is guaranteed. The state is obligated o implement policies to improve the welfare of the elderly and adolescents.`,
    images: ['/flowline/assets/work_portfolio_07.jpg']
  },
  {
    type: ['e-commerce', 'system'],
    renderText: ['E-Commerce', 'System Integration'],
    url: '#nonoe',
    title: `경제질서는 창의를 존중함을 기본으로 한다.`,
    date: '2023.11- In progress',
    desc1: `정당의 설립은 자유이며, 복수정당제는 보장된다. 국가는 노인과 청소년의 복지향상을 위한 정책을 실시할 의무를 진다.`,
    desc2: `The establishment of a political party is free, and a multiparty system is guaranteed. The state is obligated o implement policies to improve the welfare of the elderly and adolescents.`,
    images: ['/flowline/assets/work_portfolio_08.jpg']
  },
  {
    type: ['e-commerce', 'system'],
    renderText: ['E-Commerce', 'System Integration'],
    url: '#nonoe',
    title: `예비비는 총액으로 국회의 의결을 얻어야 한다.`,
    date: '2023.11',
    desc1: `정당의 설립은 자유이며, 복수정당제는 보장된다. 국가는 노인과 청소년의 복지향상을 위한 정책을 실시할 의무를 진다.`,
    desc2: `The establishment of a political party is free, and a multiparty system is guaranteed. The state is obligated o implement policies to improve the welfare of the elderly and adolescents.`,
    images: ['/flowline/assets/work_portfolio_09.jpg']
  },
  {
    type: ['e-commerce', 'system'],
    renderText: ['E-Commerce', 'System Integration'],
    url: '#nonoe',
    title: `경제질서는 창의를 존중함을 기본으로 한다.`,
    date: '2023.11- In progress',
    desc1: `정당의 설립은 자유이며, 복수정당제는 보장된다. 국가는 노인과 청소년의 복지향상을 위한 정책을 실시할 의무를 진다.`,
    desc2: `The establishment of a political party is free, and a multiparty system is guaranteed. The state is obligated o implement policies to improve the welfare of the elderly and adolescents.`,
    images: ['/flowline/assets/work_portfolio_10.jpg']
  }
];

export default works;
