import ResetForm from "../../components/ui-elements/Forms/ResetForm"


const ResetPasswordPage = () => {
  return (
    <main className="main">
      <section className="form-card !h-[30rem]">
        <h1 className="text-3xl text-center">Reset your password</h1>
        <br />
        <br />
        <ResetForm />
      </section>
      <div className="overlay" />
    </main>
  )

}
              


export default ResetPasswordPage
