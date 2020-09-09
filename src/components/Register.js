import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { Link as RouterLink, withRouter} from 'react-router-dom';

import firebase from 'firebase/app';
import 'firebase/database';
import  'firebase/auth';

const Mylink = React.forwardRef((props, ref) => (
    <RouterLink ref={ref} to="/getting-started/installation/" {...props} />
  ));

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Register =(props) => {
  const classes = useStyles();

  const [user, setUser] = useState({
      name:'',
      email:'',
      password:'',
      avatar:'',
  });

  const handleChange = (e) => {
      setUser({
          ...user,
          [e.target.name]: e.target.value
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
    .then(response => {
      // guardar los datos del usuario
      delete user.password;
      firebase.database().ref(`/users/${response.user.uid}`).set(user);
        //alert('Bienvenida...');
        alert('Bienvido a Web App');
        props.history.push('/');
    })
    .catch(error => {
      console.log(error);
      alert(error.message);
    });

};

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Registrarse en Web App
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Nombre"
                autoFocus
                value={user.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="avatar"
                label="URL avatar"
                name="avatar"
                value={user.avatar}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={user.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={user.password}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Registrarme
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login" component={Mylink}variant="body2">
                {"Ingresa por aqui si tienes cuenta"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default withRouter(Register);