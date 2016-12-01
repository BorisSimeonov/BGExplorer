import React from 'react';

export default class LoginView extends React.Component {
    render() {
        return (
            <form className="user-form" onSubmit={this.submitForm.bind(this)}>
                <label>
                    <div>Explorer Name</div>
                    <input type="text" name="username" required
                           ref={e => this.usernameField = e} />
                </label>
                <label>
                    <div>Password</div>
                    <input type="password" name="password" required
                           ref={e => this.passwordField = e} />
                </label>
                <div>
                    <input type="submit" value="Login" />
                </div>
            </form>
        )
    }

    submitForm(event) {
        event.preventDefault();
        //TODO: implement register logic through kinveyAjaxRequester
        this.props.onsubmit(
            this.usernameField.value,
            this.passwordField.value
        )

    }
}
