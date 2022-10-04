import React, { useState } from "react";
import { HiUserAdd } from "react-icons/hi";
import { useEffect } from "react";
import axios from "axios";
import {
	Button,
	CircularProgress,
	FormControl,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Spinner,
	Select,
	Tag,
	Tooltip,
	useDisclosure,
} from "@chakra-ui/react";
import { useStateContext } from "../lib/context";
const AddEmployeeForm = () => {
	const CustomCard = React.forwardRef(({ children, ...rest }, ref) => (
		<div
			className="hover:opacity-60 transition-opacity duration-300"
			ref={ref}
			{...rest}
		>
			{children}
		</div>
	));
	const { getEmployees, employees } = useStateContext();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const initialRef = React.useRef(null);
	const finalRef = React.useRef(null);
	/*
		cn = contactNumber;
		ct = contractType; 
	*/
	const [add, setAdd] = useState({
		fn: "", 
		mn: "", 
		ln: "", 
		age:"", 
		sex: "", 
		cs:"", 
		bday: "", 
		cn:"", 
		email: "", 
		ct: "", 
		role: "", 
		dj: ""
	});
	const handleChange = (e) => {
		const { value, name } = e.target;
		setAdd({
			...add,
			[name]: value,
		});
	};
	const addEmployee = async (e) => {
		e.preventDefault();
		// fn, mn, ln Uppercase first letter formatter
		let fn = add.fn.split(" ").length > 1 ?
			add.fn.split(" ").map(e => {return `${e[0].toUpperCase()}${e.slice(1, e.length)}`}).join(" ") :
			add.fn[0].toUpperCase() + add.fn.slice(1, add.fn.length)
		
		let mn = add.mn.split(" ").length > 1 ?
		add.mn.split(" ").map(e => {return `${e[0].toUpperCase()}${e.slice(1, e.length)}`}).join(" ") :
		add.mn[0].toUpperCase() + add.mn.slice(1, add.mn.length)

		let ln = add.ln.split(" ").length > 1 ?
			add.ln.split(" ").map(e => {return `${e[0].toUpperCase()}${e.slice(1, e.length)}`}).join(" ") :
			add.ln[0].toUpperCase() + add.ln.slice(1, add.ln.length)
		
		// data.LastName.split("").splice(0, 1).join("").toUpperCase() +
		// data.LastName.split("").splice(1, data.LastName.length).join("");

		let date = add.dj;
		const url = `https://localhost:7259/api/Employee?Id=${
			employees.length===0 ? 
			1 :
			employees[employees.length - 1].id + 1
		}&FirstName=${fn}&MiddleName=${mn}&LastName=${ln}&Age=${add.age}&Sex=${add.sex}&CivilStatus=${add.cs}&Birthday=${add.bday}&ContactNumber=${add.cn}&EmailAddress=${add.email}&{ContractType=${add.ct}&Role=${
			add.role
		}&DateJoined=${date}`;
		axios.post(url).then((result) => console.log(result));
		onClose();
		/*
			cn = contactNumber;
			ct = contractType; 
		*/
		setAdd({ fn: "", mn: "", ln: "", age:"", sex: "", cs:"", bday: "", cn:"", email: "", ct: "", role: "", dj: ""});
		await getEmployees();
	};

	return (
		<div className="text-3xl cursor-pointer">
			<Tooltip placement="right" label="Add Employee">
				<CustomCard onClick={onOpen}>
					<HiUserAdd />
				</CustomCard>
			</Tooltip>

			<Modal
				initialFocusRef={initialRef}
				finalFocusRef={finalRef}
				isOpen={isOpen}
				onClose={onClose}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Add Employee</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<FormControl>
							<FormLabel>First name</FormLabel>
							<Input
								onChange={handleChange}
								name="fn"
								ref={initialRef}
								placeholder="First name"
							/>
						</FormControl>

						<FormControl mt={4}>
							<FormLabel>Middle name</FormLabel>
							<Input
								onChange={handleChange}
								name="mn"
								placeholder="Middle name"
							/>
						</FormControl>

						<FormControl mt={4}>
							<FormLabel>Last name</FormLabel>
							<Input
								onChange={handleChange}
								name="ln"
								placeholder="Last name"
							/>
						</FormControl>

						<FormControl mt={4}>
							<FormLabel>Age</FormLabel>
							<Input
								onChange={handleChange}
								name="age"
								placeholder="Age"
							/>
						</FormControl>
						<FormControl mt={4}>
							<FormLabel>Sex</FormLabel>
							<Select 
								onChange={handleChange}
								className="border px-3 py-2 rounded-lg w-full"
								name="sex"
								id=""
								>
									<option value='Male'>Male</option>
									<option value='Female'>Female</option>
									<option value='Other'>Other</option>
							</Select>
						</FormControl>
						<FormControl mt={4}>
							<FormLabel>Civil Status</FormLabel>
							<Select
								onChange={handleChange}
								className="border px-3 py-2 rounded-lg w-full"
								name="cs"
								id=""
								>
									<option default value="Single">Single</option>
									<option value="Married">Married</option>
									<option value="Divorced">Divorced</option>
									<option value="Widow">Widow</option>
							</Select>
						</FormControl>
						<FormControl mt={4}>
							<FormLabel>Birthday</FormLabel>
							<Input
								onChange={handleChange}
								className="border px-3 py-2 rounded-lg w-full"
								type="date"
								name="bday"
								id=""
								/>
						</FormControl>
						
						<FormControl mt={4}>
							<FormLabel>Contact Number</FormLabel>
							<Input
								onChange={handleChange}
								className="border px-3 py-2 rounded-lg w-full"
								name="cn"
								id=""
								placeholder="+639123456789"
								/>
						</FormControl>

						<FormControl mt={4}>
							<FormLabel>Email Address</FormLabel>
							<Input
								onChange={handleChange}
								className="border px-3 py-2 rounded-lg w-full"
								type='email'
								name="email"
								id=""
								/>
						</FormControl>
						
						<FormControl mt={4}>
							<FormLabel>Contract Type</FormLabel>
							<Select
								onChange={handleChange}
								className="border px-3 py-2 rounded-lg w-full"
								name="ct"
								id=""
								>
									<option value='Regular'>Regular</option>
									<option value='Part-time'>Part-time</option>
							</Select>
						</FormControl>
						<FormControl mt={4}>
							<FormLabel>Role</FormLabel>
							<Input onChange={handleChange} name="role" placeholder="Role" />
						</FormControl>

						<FormControl mt={4}>
							<FormLabel>Date Joined</FormLabel>
							<input
								onChange={handleChange}
								className="border px-3 py-2 rounded-lg w-full"
								type="date"
								name="dj"
								id=""
							/>
						</FormControl>
					</ModalBody>

					<ModalFooter>
						<Button onClick={addEmployee} colorScheme="green" mr={3}>
							Add
						</Button>
						<Button onClick={onClose}>Cancel</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</div>
	);
};

export default AddEmployeeForm;
