import React from 'react';
import {
  Grid,
  Container,
  Card,
  CardContent,
  Typography,
} from '@material-ui/core';
import './DetectAdBlock.css';

export default class DetectAdBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adBlockDetected: false,
    };
    this.detectAdBlocker = this.detectAdBlocker.bind(this);
  }

  componentDidMount() {
    this.detectAdBlocker();
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.pathname !== nextProps.pathname) {
      this.detectAdBlocker();
    }
  }

  detectAdBlocker() {
    const head = document.getElementsByTagName('head')[0];

    const noAdBlockDetected = () => {
      this.setState({
        adBlockDetected: false,
      });
    };

    const adBlockDetected = () => {
      this.setState({
        adBlockDetected: true,
      });
    };

    const oldScript = document.getElementById('adblock-detection');
    if (oldScript) {
      head.removeChild(oldScript);
    }

    const script = document.createElement('script');
    script.id = 'adblock-detection';
    script.type = 'text/javascript';
    script.src = '/js/adframe.js';
    script.onload = noAdBlockDetected;
    script.onerror = adBlockDetected;
    head.appendChild(script);
  }

  noticeContentJSX() {
    return (
      <Container>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item>
            <div id="adBlockerAlert">
              <Card>
                <CardContent>
                  <Typography>
                    Nosso sistema detectou a presença de um software de bloqueio
                    de publicidade, vulgo AdBlocker. Para que se tenha acesso a
                    todo o nosso conteúdo de canais, pedimos que desabilite o
                    AdBlocker e recarregue a página pressionando a tecla{' '}
                    <strong>F5</strong>.
                  </Typography>
                </CardContent>
              </Card>
            </div>
          </Grid>
        </Grid>
      </Container>
    );
  }

  render() {
    return this.state.adBlockDetected
      ? this.noticeContentJSX()
      : this.props.children;
  }
}
