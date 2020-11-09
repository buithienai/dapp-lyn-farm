import React, { Component } from "react";
import _ from "lodash";
import { PAGE_SIZE } from '../../../commons/constants';

class Pagination extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pageActive: 1
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			pageActive: parseInt(nextProps.page + 1)
		});
	}

	_renderPaging = () => {
		if (this.props.totalPage > PAGE_SIZE) {
			return (
				<ul className="pagination justify-content-center align-content-center">
					{this._renderPreviousPaging()}
					{this._renderContentPaging()}
					{this._renderNextPaging()}
				</ul>
			);
		}

		return null;
	}

	_renderPreviousPaging = () => {
		let pageActive = this.state.pageActive;

		if (pageActive > 1) {
			return (
				<li className="page-item">
					<a className="page-link previous" onClick={() => this.onChangePage("Previous")} >
						<i className="icon icon-dropdown" />
					</a>
				</li>
			);
		}

		return (
			<li className="page-item">
				<a className="page-link previous  not-allowed">
					<i className="icon icon-dropdown" />
				</a>
			</li>
		);
	}

	_renderNextPaging = () => {
		let totalPage = Math.ceil(this.props.totalPage / PAGE_SIZE);
		let pageActive = this.state.pageActive;

		if (pageActive < totalPage) {
			return (
				<li className="page-item">
					<a className="page-link next" onClick={() => this.onChangePage("Next")} >
						<i className="icon icon-dropdown" />
					</a>
				</li>
			);
		}

		return (
			<li className="page-item">
				<a className="page-link next not-allowed">
					<i className="icon icon-dropdown" />
				</a>
			</li>
		);
	}

	pagination = (currentPage, nrOfPages) => {
		if (!nrOfPages) {
			nrOfPages = 1;
		}

		var delta = 2,
			range = [],
			rangeWithDots = [],
			l;

		range.push(1);

		if (nrOfPages <= 1) {
			return range;
		}

		for (let i = currentPage - delta; i <= currentPage + delta; i++) {
			if (i < nrOfPages && i > 1) {
				range.push(i);
			}
		}
		range.push(nrOfPages);

		for (let i of range) {
			if (l) {
				if (i - l === 2) {
					rangeWithDots.push(l + 1);
				} else if (i - l !== 1) {
					rangeWithDots.push("...");
				}
			}
			rangeWithDots.push(i);
			l = i;
		}

		return rangeWithDots;
	}

	_renderContentPaging = () => {
		let totalPage = Math.ceil(this.props.totalPage / PAGE_SIZE);
		let listPageNumber = this.pagination(this.state.pageActive, totalPage);
		let page = this.state.pageActive;

		return listPageNumber.map((pageNumber, index) => {
			if (!_.isNumber(pageNumber)) {
				return (
					<li key={index} className={page === pageNumber ? "page-item" : "page-item"}>
						<a className={page === pageNumber ? "page-link active" : "page-link"}>
							<span>{pageNumber}</span>
						</a>
					</li>
				);
			}

			if (listPageNumber.length === 1) {
				return (
					<li key={index} className="page-item active">
						<a className={page === pageNumber ? "page-link active" : "page-link"} onClick={() => this.onChangePage(pageNumber)}>
							<span>{pageNumber}</span>
						</a>
					</li>
				);
			}

			return (
				<li key={index} className={page === pageNumber ? "page-item active" : "page-item"}>
					<a className={page === pageNumber ? "page-link active" : "page-link"} onClick={() => this.onChangePage(pageNumber)}>
						<span>{pageNumber}</span>
					</a>
				</li>
			);
		});
	}

	onChangePage = (active) => {
		let totalPage = Math.ceil(this.props.totalPage / PAGE_SIZE);

		if (active === "Previous") {
			if (this.state.pageActive > 1) {
				this.setState({
					pageActive: this.state.pageActive - 1
				});

				this.props.handleChangePage(this.state.pageActive - 1);
			}
			return;
		}

		if (active === "Next") {
			if (this.state.pageActive < totalPage) {
				this.setState({
					pageActive: this.state.pageActive + 1
				});

				this.props.handleChangePage(this.state.pageActive + 1);
			}
			return;
		}

		this.props.handleChangePage(active);

		this.setState({
			pageActive: active
		});

		return;
	}

	render() {
		return this._renderPaging();
	}
}

export default Pagination;