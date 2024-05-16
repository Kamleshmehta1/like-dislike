import PropTypes from 'prop-types';
import { FormProvider as Form } from 'react-hook-form';

function FormProvider({ onSubmit, methods, children }) {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </Form>
  );
}

FormProvider.propTypes = {
  children: PropTypes.any,
  methods: PropTypes.any,
  onSubmit: PropTypes.any,
};

export default FormProvider;
