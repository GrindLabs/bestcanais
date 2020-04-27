import React from 'react';
import SingleLayout from '/imports/ui/layouts/SingleLayout';
import { Grid, Container, makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  grid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  titleBottomMargin: {
    marginBottom: '40px',
  },
  bodyBottomMargin: {
    marginBottom: '30px',
  },
}));

const TermPage = props => {
  const classes = useStyles();
  return (
    <SingleLayout>
      <Container maxWidth="xl" fixed>
        <Grid container spacing={1} justify="center" className={classes.grid}>
          <Grid item container spacing={1} xs={8}>
            <Typography component="h2" variant="h2" gutterBottom>
              Termos de Uso - AssistirTV Gratis
            </Typography>
            <Typography variant="body1" gutterBottom>
              Olá! Bem-vindo(a) à AssistirTV Gratis. Pedimos que leia com
              atenção os nossos Termos de Uso. Aqui você encontrará todas as
              informações necessárias para acessar a nosso site e usufruir dos
              nossos serviços com segurança e tranquilidade.
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              className={classes.titleBottomMargin}>
              Lembramos que ao acessar a nosso site (asssitirtv.gratis) você
              concorda com os nossos Termos de Uso e estará sujeito(a) às
              condições abaixo.
            </Typography>
            <Typography variant="h5" gutterBottom>
              1. O QUE A ASSISTIRTV FAZ? (SERVIÇOS)
            </Typography>
            <Typography variant="body1" gutterBottom>
              1.1. Os serviços da AssistirTV consistem na retransmissão de
              canais de televisão variados disponíveis na internet. A AssistirTV
              não detêm nenhum dos canais disponíveis em sua base de dados,
              apenas retrasmitimos sinais já presentes na internet.
            </Typography>
            <Typography variant="body1" gutterBottom>
              1.2. O acesso aos canais pode ser realizado pelo celular ou
              computador, desde que com acesso à Internet. O usuário é o único
              responsável pela contratação do serviço de conexão à Internet,
              sendo que a AssistirTV não se responsabiliza pela falha nos
              serviços de conexão que possam interferir na disponibilização do
              conteúdo no site.
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              className={classes.bodyBottomMargin}>
              1.3. Os canais ofertados são retransmitidos de sites de terceiros
              públicos, portando a AssistirTV não se responsabiliza pelo
              conteudo, qualidade do sinal ou para caso o canal venha a ficar
              fora do ar. NÃO hospedamos nenhum dos canais neste site.
            </Typography>
            <Typography variant="h5" gutterBottom>
              2. QUEM PODE TER ACESSO AOS SERVIÇOS DA ASSISTIRTV?
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              className={classes.bodyBottomMargin}>
              2.1. A AssistirTV disponibiliza de forma gratuita os canais a
              todos, sem a necessidade de pagamento ou contratação de serviços.
            </Typography>
            <Typography variant="h5" gutterBottom>
              3. QUAIS TIPOS DE CANAIS A ASSISTIRTV RETRANSMITE?
            </Typography>
            <Typography variant="body1" gutterBottom>
              3.1. A AssistirTV retransmite canais nacionais e internacionais
              dos mais variados tipos aos usuários. A AssistirTV não se
              responsabiliza pelo conteúdo sendo transmitido.
            </Typography>
            <Typography variant="body1" gutterBottom>
              3.2. A AssistirTV não retransmite canais adultos ou ofensivos aos
              usuários.
            </Typography>
            <Typography variant="body1" gutterBottom>
              3.3. A AssistirTV reforça aos usuários que verifiquem a
              classificação etária do conteudo apresentado. Essa classificação
              etária é de inteira responsabilidade do canal detentor dos
              direitos do produto apresentado.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </SingleLayout>
  );
};

export default TermPage;
