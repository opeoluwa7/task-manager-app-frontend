import ForgotPasswordForm from "../../components/ui-elements/Forms/ForgotPasswordForm"



const ForgotPasswordPage = () => {
  return (
  <main className="main">
    <section className="form-card !h-[30rem]">
      <h1 className="text-3xl text-center">Forgot your password?</h1>
        <br />
        <p className="text-sm text-center"> Enter your email, you will receive a link which you will use to reset your password</p>
      <br />
      <br />
      <ForgotPasswordForm />
    </section>
    <div className="overlay" />
  </main>
  )
}

export default ForgotPasswordPage
