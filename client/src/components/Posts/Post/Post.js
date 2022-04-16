import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Modal, Box, Paper, TextField } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import ChangeCircleIcon from '@material-ui/icons/ChangeHistoryRounded';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import FileBase from 'react-file-base64';
import { createPost, deletePost, updatePost } from '../../../actions/posts';
import useStyles from './styles';

const Post = ({ post, currentId, setCurrentId }) => {
  const [open, setOpen] = useState(false);
  const [postData, setPostData] = useState({ name: '', description: '', price: '', stock: '', selectedFile: '' });
  const dispatch = useDispatch();
  const classes = useStyles();

  const clear = () => {
    setCurrentId(0);
    setPostData({ name: '', description: '', price: '', stock: '', selectedFile: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentId === 0) {
      dispatch(createPost(postData));
      clear();
    } else {
      dispatch(updatePost(currentId, postData));
      setOpen(true)
      clear();
    }
  };

  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  return (
    <>
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
      <Card className={classes.card}>
        <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.name} />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
        </div>

        <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.description}</Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">Price:{post.price}</Typography>
          <Typography variant="body2" color="textSecondary" component="p">Stock:{post.stock}</Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}><DeleteIcon fontSize="small" /> Delete</Button>
          <Button size="small" color="secondary" onClick={() => setCurrentId(post._id)}><ChangeCircleIcon fontSize="small" /> Update</Button>
        </CardActions>
      </Card>
    </>
  );
};

export default Post;
