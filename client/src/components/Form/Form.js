import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper, Modal, Box } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

import useStyles from './styles';
import { createPost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {
  const [open, setOpen] = useState(false);
  const [postData, setPostData] = useState({ name: '', description: '', price: '', stock: '', selectedFile: '' });
  const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({ name: '', description: '', price: '', stock: '', selectedFile: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(createPost(postData));
      setOpen(true)
      clear();
    } else {
      clear();
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button onClick={handleOpen} variant="contained" color="secondary" size="small">Add Product</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.modal}>
          <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
              <Typography variant="h6"></Typography>
              <TextField name="name" type="text" variant="outlined" label="name" fullWidth value={postData.name} onChange={(e) => setPostData({ ...postData, name: e.target.value })} />
              <TextField name="description" type="text" variant="outlined" label="description" fullWidth value={postData.description} onChange={(e) => setPostData({ ...postData, description: e.target.value })} />
              <TextField name="price" type="number" variant="outlined" label="price" fullWidth value={postData.price} onChange={(e) => setPostData({ ...postData, price: e.target.value })} />
              <TextField name="stock" type="number" variant="outlined" label="stock" fullWidth value={postData.stock} onChange={(e) => setPostData({ ...postData, stock: e.target.value })} />
              <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
              <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
              <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
          </Paper>
        </Box>
      </Modal>
    </>
  );
};

export default Form;
