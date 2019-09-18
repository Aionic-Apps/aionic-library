import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Api from '../services/api';
import Session from '../services/session';

import Spinner from './UI/Spinner';

class SigninForm extends Component {
	constructor(props) {
		super(props);

		this.state = { user: {}, isLoading: false, msg: '' };
	}

	handleInputChange = (e) => {
		const { name } = e.target;
		const { value } = e.target;

		this.setState((prevState) => {
			return { user: { ...prevState.user, [name]: value } };
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();

		this.setState({
			isLoading: true,
			msg: ''
		});

		Session.signinUser({ user: this.state.user })
			.then((res) => {
				Session.clearUser();
				Session.setToken(res.token);
				Session.setUser(res.user);
				this.props.history.push('/');
			})
			.catch((err) => {
				this.setState({
					isLoading: false,
					msg: Api.handleHttpError(err)
				});
			});
	};

	render() {
		const { isLoading, msg } = this.state;

		return (
			<div className="SigninForm">
				<form onSubmit={this.handleSubmit}>
					<input
						type="email"
						name="email"
						className="form-control mb-1"
						placeholder="Email address"
						onChange={this.handleInputChange}
						required
					/>
					<input
						type="password"
						name="password"
						className="form-control"
						placeholder="Password"
						onChange={this.handleInputChange}
						required
					/>
					<button className="button button-primary btn-block mt-3" type="submit">
						{isLoading ? (
							<Spinner onBtn={true} />
						) : (
							<div>
								<i className="fas fa-sign-in-alt mr-1" /> Sign in
							</div>
						)}
					</button>

					{msg.length ? <p className="mt-3 text-danger">{msg}</p> : null}
				</form>
			</div>
		);
	}
}

export default withRouter(SigninForm);
