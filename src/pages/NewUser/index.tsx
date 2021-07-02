import { useState , useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button, Select, message } from "antd";

import config from '../../config';
import routes from '../../config/routes';
import { IUser } from '../../interfaces/IUser';
import { IImportingGroup } from "../../interfaces/IImportingGroup";
import { IImportingLocation } from "../../interfaces/IImportingLocation";
import { IPagingResponse } from "../../interfaces/IPaging";
import UserService from '../../services/User';
import ImportingGroupService from '../../services/ImportingGroup'
import ImportingLocationService from '../../services/LocationProvience'

import PageHeader from '../../components/PageHeader';

const NewUser = () => {
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const [groups, setGroups] = useState<IImportingGroup[]>([]);
  const [locations, setLocations] = useState<IImportingLocation[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    ImportingGroupService.getImportingVehicles({})
      .then((response: IPagingResponse<IImportingGroup>) => {
        setGroups(response?.results);
      })
      .catch(err => {})
  }, [])


  useEffect(() => {
    ImportingLocationService.getImportingLocations({})
      .then((response: IPagingResponse<IImportingLocation>) => {
        setLocations(response?.results);
      })
      .catch(err => {})
  }, [])


  const handleSubmit = (values: any) => {
    setLoading(true);
    UserService.addUser(values)
      .then((user: IUser) => {
        history.push(routes.users.path)
      })
      .catch((err) => {
        if(err.status === 400) {
          message.error('Validation error')
        } else {
          message.error('Some error occured. Please try again!')
        }
      })
      .finally(() => {
        setLoading(false);
      })
  }

  const onGenderChange = (value: string) => {
    form.setFieldsValue({ gender: value });
  };

  const onGroupChange = (value: string) => {
    form.setFieldsValue({ group: value });
  };

  const onManufacturarChange =(value:string)=>{
    form.setFieldsValue({manufacturer:value})
  }

  const onLocationChange =(value:string) =>{
    form.setFieldsValue({bhansar_office:value})
  }

  return (
    <div>
      <PageHeader title="Add new user" />
      <div>
        <Form form={form} onFinish={handleSubmit} className="login-form">
          <Form.Item name="email" rules={[{ required: true, type: 'email', message: 'Please input your email!' }]}>
            <div className="input-label">
              <label htmlFor="email">Email</label>
              <Input
                id="email"
                size="large"
                placeholder="Email"
              />
            </div>
          </Form.Item>

          <Form.Item name="first_name" rules={[{ required: true, message: 'Please input your first name!' }]}>
            <div className="input-label">
              <label htmlFor="first_name">First name</label>
              <Input
                id="first_name"
                size="large"
                placeholder="First name"
              />
            </div>
          </Form.Item>

          <Form.Item name="middle_name">
            <div className="input-label">
              <label htmlFor="middle_name">Middle name</label>
              <Input
                id="middle_name"
                size="large"
                placeholder="Middle name"
              />
            </div>
          </Form.Item>

          <Form.Item name="last_name" rules={[{ required: true, message: 'Please input your last name!' }]}>
            <div className="input-label">
              <label htmlFor="last_name">Last name</label>
              <Input
                id="last_name"
                size="large"
                placeholder="Last name"
              />
            </div>
          </Form.Item>

          <Form.Item name="phone_number" rules={[{ required: true, message: 'Please input your phone number!' }]}>
            <div className="input-label">
              <label htmlFor="phone_number">Phone number</label>
              <Input
                id="phone_number"
                size="large"
                placeholder="Phone number"
              />
            </div>
          </Form.Item>

          <Form.Item name="gender" rules={[{ required: true, message: 'Please input your gender!' }]}>
            <div className="input-label">
              <label htmlFor="gender">Gender</label>
                <Select 
                  onChange={onGenderChange} 
                  style={{ width: "100%" }} 
                  placeholder="Select gender"
                >
                <Select.Option value="">Select gender</Select.Option>
                <Select.Option value={config.gender.male}>Male</Select.Option>
                <Select.Option value={config.gender.female}>Female</Select.Option>
              </Select>
            </div>
          </Form.Item>

          <Form.Item name="group" rules={[{ required: true, message: 'Please input your gender!' }]}>
            <div className="input-label">
                <label htmlFor="group">Group</label>
                <Select 
                  onChange={onGroupChange} 
                  style={{ width: "100%" }} 
                  placeholder="Select group"
                >
                  <Select.Option  value={config.roles.BhansarAgent}>Bhansar agent</Select.Option>
                  <Select.Option  value={config.roles.CompanyAdmin}>Company admin</Select.Option>
                  <Select.Option  value={config.roles.CompanyUser}>Company user</Select.Option>
                  <Select.Option  value={config.roles.ShowroomAdmin}>Showroom admin</Select.Option>
                  <Select.Option  value={config.roles.SystemAdmin}>System admin</Select.Option>
                </Select>

            </div>
          </Form.Item>

          <Form.Item name="manufacturer" rules={[{ required: false, message: 'Please Select Manufacturar' }]}>
            <div className="input-label">
                <label htmlFor="manufacturer">Select Manufacturar</label>
                <Select 
                  onChange={onManufacturarChange} 
                  style={{ width: "100%" }} 
                  placeholder="Select Manufacturar"
                  loading={groups.length===0}
                >
                  {
                  groups?.map((group: IImportingGroup) => (
                     <Select.Option key={group.slug} value={group.slug}>{group.name}</Select.Option>
                   ))
                 }
                </Select>

            </div>
          </Form.Item>

          <Form.Item name="location" rules={[{ required: false, message: 'Please Select location' }]}>
            <div className="input-label">
                <label htmlFor="location">Select Location</label>
                <Select 
                  onChange={onLocationChange} 
                  style={{ width: "100%" }} 
                  placeholder="Select Location"
                  loading={locations.length===0}
                >
                  {
                  locations?.map((location:IImportingLocation ) => (
                     <Select.Option key={location.uuid} value={location.uuid}>{location.title}</Select.Option>
                   ))
                 }
                </Select>

            </div>
          </Form.Item>

          <Form.Item style={{ paddingTop: '1em' }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default NewUser;
