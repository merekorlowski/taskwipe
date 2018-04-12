// import React from 'react';
// import createClass from 'create-react-class';
// // import EmployeeService from '../../services/employees';
// import { PropTypes } from 'prop-types';
// import Select from 'react-select';
// import 'react-select/dist/react-select.css';
// import './select.less';
// // import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

// // Alternative to the current dropdown
// /*
// class EmployeeDropdown extends Component{
// 	constructor(props){
// 		super(props);
// 		this.employeeService = new EmployeeService();
// 		this.toggle =this.toggle.bind(this);
// 		this.state= { dropdownOpen: false };
// 	}
// 	toggle(){
// 		this.setState({
// 			dropdownOpen: !this.state.dropdownOpen
// 		});
// 	}

// 	render(){
// 		return (
// 			<Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
// 				<DropdownToggle caret>
// 					Employees
// 				</DropdownToggle>
// 				<DropdownMenu>
// 					<DropdownItem header>Users</DropdownItem>
// 				</DropdownMenu>
// 			</Dropdown>
// 		);
// 	}
// }
// */

// // const employeeService = new EmployeeService();

// class EmployeeDropdown extends Component {
// 	displayName: 'EmployeeDropdown',
// 	propTypes: {
// 		label: PropTypes.string,
// 		searchable: PropTypes.bool,
// 		clearable: PropTypes.bool
// 	},
// 	getDefaultProps() {
// 		return {
// 			label: 'Employees',
// 			searchable: true,
// 			clearable: true

// 		};
// 	},
// 	switchView(value, event) {
// 		// switch the state task page view to the selected employee view
// 	},
// 	getInitialState() {
// 		return {
// 			searchable: this.props.searchable,
// 			clearable: true,
// 			disabled: false,
// 			selectValue: 'current user'// to be changed
// 		};
// 	},
// 	updateValue(newValue) {
// 		this.setState({
// 			selectValue: newValue
// 		});
// 	},
// 	render() {
// 		// let options = employeeService.getAllEmployees();// get the data from json, need to edit
// 		return (
// 			<div className="section">
// 				{/* <label htmlFor="employee-select"><em>{this.props.label}</em></label> */}
// 				<Select
// 					id="employee-select"
// 					ref={(ref) => { this.select = ref; }}
// 					onBlurResetsInput={false}
// 					onSelectResetsInput={false}
// 					autoFocus
// 					options={[
// 						{ value: 'one', label: 'One' },
// 						{ value: 'two', label: 'Two' }// dummy for now, this is where you add the options for the dropdown
// 					]}
// 					simpleValue
// 					clearable={this.state.clearable}
// 					name="employee-select"
// 					disabled={this.state.disabled}
// 					value={this.state.selectValue}
// 					onChange={this.updateValue}
// 					style={{width: '200px'}}// adjust the styling here
// 					searchable={this.state.searchable} />
// 			</div>
// 		);
// 	}
// });
// export default EmployeeDropdown;
