import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';

const EmployeeForm = ({registerEmployee}) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        mobile: '',
        dob: '',
        aadhar: '',
        pan: '',
        houseNo: '',
        buildingName: '',
        area: '',
        city: '',
        state: '',
        pincode: ''
    });
    const [errors, setErrors] = useState({});
    const [successMsg, setSuccessMsg] = useState("");

    const validate = () => {
        const newErrors = {};
        // Name 
        if(!formData.fullName.trim()) newErrors.fullName = "Full name is required";
        // Email 
        const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!formData.email.trim()) newErrors.email = "Email is required";
        else if(!emailReg.test(formData.email)) newErrors.email = "Invalid email format";
        // Mobile
        const mobileReg = /^[0-9]{10}$/;
        if(!formData.mobile.trim()) newErrors.mobile = "Mobile number is required";
        else if(!mobileReg.test(formData.mobile)) newErrors.mobile = "Mobile number must be 10 digits";
        // dob
        if(!formData.dob) newErrors.dob = "Date of Birth is required";
        // aadhar
        const aadharReg = /^[0-9]{12}$/;
        if(!formData.aadhar.trim()) newErrors.aadhar = "AADHAR Number is required";
        else if(!aadharReg.test(formData.aadhar)) newErrors.aadhar = "AADHAR number must be 12 digits";
        // pan
        const panReg = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        if(!formData.pan.trim()) newErrors.pan = "PAN Number is required";
        else if(!panReg.test(formData.pan)) newErrors.pan = "Invalid PAN format";
        // Address
        if (!formData.houseNo.trim()) newErrors.houseNo = 'House No is required';
        if (!formData.area.trim()) newErrors.area = 'Area is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.state.trim()) newErrors.state = 'State is required';
        // pincode    
        const pincodeRegex = /^[0-9]{6}$/;
        if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
        else if (!pincodeRegex.test(formData.pincode)) newErrors.pincode = 'Pincode must be 6 digits';
        return newErrors;
    };
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const validErrors = validate();
        if(Object.keys(validErrors).length!==0){
            setErrors(validErrors);
            return;
        }
        setErrors({});
        const employeeData = {
            ...formData,
            address: {
                houseNo: formData.houseNo,
                buildingName: formData.buildingName,
                area: formData.area,
                city: formData.city,
                state: formData.state,
                pincode: formData.pincode
            }
        };
        // Remove individual address fields from the top level
        delete employeeData.houseNo;
        delete employeeData.buildingName;
        delete employeeData.area;
        delete employeeData.city;
        delete employeeData.state;
        delete employeeData.pincode;

        const registerEmp = registerEmployee(employeeData);
        // Reset form
        setFormData({
            fullName: '',
            email: '',
            mobile: '',
            dob: '',
            aadhar: '',
            pan: '',
            houseNo: '',
            buildingName: '',
            area: '',
            city: '',
            state: '',
            pincode: ''
        });
        setSuccessMsg(`Employee Registered Successfully with ID: ${registerEmp}`);
        setTimeout(()=>{
            setSuccessMsg('');
            navigate('/employees');
        }, 3000);
    };
    return (
    <div className="form-container">
        <h2 className="section-title">Employee Registration Form</h2>
        
        {successMsg && (
            <div className="success-message">{successMsg}</div>
        )}
        
        <form onSubmit={handleSubmit} autoComplete="off">
            <h3>Personal Information</h3>
            <div className="form-row">
            <div className="form-group">
                <label htmlFor="fullName">Full Name*</label>
                <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={errors.fullName ? 'error-input' : ''}
                />
                {errors.fullName && <div className="error">{errors.fullName}</div>}
            </div>
            
            <div className="form-group">
                <label htmlFor="email">Email*</label>
                <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error-input' : ''}
                />
                {errors.email && <div className="error">{errors.email}</div>}
            </div>
            </div>
            
            <div className="form-row">
            <div className="form-group">
                <label htmlFor="mobile">Mobile Number*</label>
                <input
                type="text"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className={errors.mobile ? 'error-input' : ''}
                />
                {errors.mobile && <div className="error">{errors.mobile}</div>}
            </div>
            
            <div className="form-group">
                <label htmlFor="dob">Date of Birth*</label>
                <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className={errors.dob ? 'error-input' : ''}
                />
                {errors.dob && <div className="error">{errors.dob}</div>}
            </div>
            </div>
            
            <div className="form-row">
            <div className="form-group">
                <label htmlFor="aadhar">AADHAR Number*</label>
                <input
                type="text"
                id="aadhar"
                name="aadhar"
                value={formData.aadhar}
                onChange={handleChange}
                className={errors.aadhar ? 'error-input' : ''}
                />
                {errors.aadhar && <div className="error">{errors.aadhar}</div>}
            </div>
            
            <div className="form-group">
                <label htmlFor="pan">PAN Number*</label>
                <input
                type="text"
                id="pan"
                name="pan"
                value={formData.pan}
                onChange={handleChange}
                className={errors.pan ? 'error-input' : ''}
                />
                {errors.pan && <div className="error">{errors.pan}</div>}
            </div>
            </div>
            
            <h3>Address Details</h3>
            <div className="form-row">
            <div className="form-group">
                <label htmlFor="houseNo">House No*</label>
                <input
                type="text"
                id="houseNo"
                name="houseNo"
                value={formData.houseNo}
                onChange={handleChange}
                className={errors.houseNo ? 'error-input' : ''}
                />
                {errors.houseNo && <div className="error">{errors.houseNo}</div>}
            </div>
            
            <div className="form-group">
                <label htmlFor="buildingName">Building Name</label>
                <input
                type="text"
                id="buildingName"
                name="buildingName"
                value={formData.buildingName}
                onChange={handleChange}
                />
            </div>
            </div>
            
            <div className="form-row">
            <div className="form-group">
                <label htmlFor="area">Area*</label>
                <input
                type="text"
                id="area"
                name="area"
                value={formData.area}
                onChange={handleChange}
                className={errors.area ? 'error-input' : ''}
                />
                {errors.area && <div className="error">{errors.area}</div>}
            </div>
            
            <div className="form-group">
                <label htmlFor="city">City*</label>
                <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={errors.city ? 'error-input' : ''}
                />
                {errors.city && <div className="error">{errors.city}</div>}
            </div>
            </div>
            
            <div className="form-row">
            <div className="form-group">
                <label htmlFor="state">State*</label>
                <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className={errors.state ? 'error-input' : ''}
                />
                {errors.state && <div className="error">{errors.state}</div>}
            </div>
            
            <div className="form-group">
                <label htmlFor="pincode">Pincode*</label>
                <input
                type="text"
                id="pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                className={errors.pincode ? 'error-input' : ''}
                />
                {errors.pincode && <div className="error">{errors.pincode}</div>}
            </div>
            </div>
            
            <div className="form-row">
            <button type="submit">Register Employee</button>
            </div>
        </form>
    </div>
    );
};

export default EmployeeForm;