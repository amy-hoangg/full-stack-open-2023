import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';
import CreateReviewForm from './CreateReviewForm';

const initialValues = {
  repositoryName: '',
  ownerName: '',
  rating: '',
  text: '',
};

const validationSchema = yup.object().shape({
  repositoryName: yup.string().required('Repository name is required'),
  ownerName: yup.string().required('Repository owner name is required'),
  rating: yup
    .number('Rating must be a number')
    .min(0, 'Rating must be greater or equal to 0')
    .max(100, 'Rating must be less or equal to 100')
    .required('Rating is required'),
  text: yup.string(),
});


const CreateReview = () => {
  const [createReview] = useMutation(CREATE_REVIEW);
  const naviagate = useNavigate();

  const onSubmit = async (values) => {
    const review = {
      ...values,
      rating: parseInt(values.rating),
    };

    const { data } = await createReview({ variables: { review } });

    if (data?.createReview) {
      naviagate(`/repositories/${data.createReview.repositoryId}`);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default CreateReview;