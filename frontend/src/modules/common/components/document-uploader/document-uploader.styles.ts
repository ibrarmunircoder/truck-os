import { makeStyles } from '@mui/styles';
export const useDocumentUploaderStyles = makeStyles((theme) => ({
  documentUploaderContainer: {
    background: '#FFFFFF',
    border: '1px solid #E7E7E7',
    boxShadow: '0px 20px 30px rgba(0, 0, 0, 0.05)',
    borderRadius: '10px',
    padding: '15px',
    height: 'calc(100% - 15px)',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '15px'
  },
  title: {
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '20px',
    color: '#212324',
    marginTop: '0',
    order: 1
  },
  addDocumentContainer: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: '8px',
    padding: '0px 15px',
    order: 4
  },
  addDocumentLabel: {
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '20px',
  },
  addDocumentPlusIcon: {
    width: '8.59px',
    height: '8.86px',
    objectFit: 'contain',
    marginLeft: 'auto',
  },
  addDocumentPhotoIcon: {
    width: '20px',
    height: '20px',
    objectFit: 'contain',
    marginRight: '10px',
  },
  fileUploaderBox:{
    border: '1px dashed #E7E7E7',
    borderRadius: '8px',
    minHeight: '300px',
    marginBottom: '15px',
    cursor: 'pointer',
    flex: '1',
    display:'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    order: 3,
    '& input[type="file"]':{
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      opacity: '0'
    },
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  dragDropIcon:{
    transform: 'rotate(45deg)'
  },
  dragDropTitle:{
    fontSize: '15px',
    letterSpacing: '0.3px',
    marginTop: '10px',
    marginBottom: '0',
    fontWeight: 500
  }
}));
