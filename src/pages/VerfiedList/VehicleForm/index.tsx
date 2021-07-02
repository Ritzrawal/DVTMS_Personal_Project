import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Button, Row, Spin, message, Col, Select } from 'antd';
import { NepaliDatePicker } from 'nepali-datepicker-reactjs';

import VehicleService from '../../../services/Vehicle';
import ProvinceService from '../../../services/Province';
import { IVehicle, IVehiclePartialInput } from '../../../interfaces/IVehicleEntry';
import {
  IDistrict,
  IMunicipalityMetropolitan,
  IProvince,
} from '../../../interfaces/IProvince';
import { getDistrictByProvinceSlug } from '../../../redux/actions/district';
import { getMetropolitanByDistrictSlug } from '../../../redux/actions/metropolitan';

import './style.scss';

interface IProps {
  uuid: string;
  hideVehicleForm: () => void;
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const VehicleForm = (props: IProps) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [initialValues, setInitialValues] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [provinces, setProvinces] = useState<IProvince[]>([]);
  const [selectedProvinceSlug, setSelectedProvinceSlug] = useState<string | null>(null);
  const [selectedDistrictSlug, setSelectedDistrictSlug] = useState<string | null>(null);

  const { districts, loading: districtLoading } = useSelector(
    (state: any) => state.districts,
  );

  const { metropolitans, loading: metropolitanLoading } = useSelector(
    (state: any) => state.metropolitans,
  );

  useEffect(() => {
    if(props.uuid) {
      setLoading(true);
      VehicleService.getById(props.uuid)
        .then((vehicle: IVehicle) => {
          setSelectedDistrictSlug(vehicle?.address?.district_slug)
          setSelectedProvinceSlug(vehicle?.address?.province_slug)
          setInitialValues({
            chassis_number: vehicle.chassis_number,
            engine_number: vehicle.engine_number,
            model: vehicle.model,
            color: vehicle.color,
            engine_capacity: vehicle.engine_capacity,
            engine_capacity_unit: vehicle.engine_capacity_unit,
            province: vehicle?.address?.province,
            district: vehicle?.address?.district,
            municipality_metropolitan: vehicle?.address?.municipality_metropolitan,
            father_or_husband: vehicle.father_or_husband,
            model_number: vehicle.model_number,
            number_of_cylinder: vehicle.number_of_cylinder,
            fuel_type: vehicle.fuel_type,
            electronic_equipment: vehicle.electronic_equipment ?? [],
            total_weight: vehicle?.weight_capacity?.total_weight,
            lifting_capacity: vehicle?.weight_capacity?.lifting_capacity,
            no_of_seat: vehicle?.weight_capacity?.no_of_seat,
            active_location: vehicle.active_location,
            proof_grant_office_name: vehicle?.entry_proof?.proof_grant_office_name,
            entry_proof_entry_no: vehicle?.entry_proof?.entry_no,
            entry_grant_police_office: vehicle?.entry_permission?.entry_grant_police_office,
            entry_grant_date: vehicle?.entry_permission?.entry_grant_date,
            entry_permission_entry_no: vehicle?.entry_permission?.entry_no,
            other_proofs: vehicle?.other_proofs?.other_proofs,
            remarks: vehicle.remarks,
          })
        })
        .catch((err) => {
          message.error('Error fetching vehicle') 
        })
        .finally(() => setLoading(false))
    }
  }, [props.uuid]);

  useEffect(() => {
    ProvinceService.getProvince()
      .then((response) => {
        setProvinces(response.results);
      })
      
  }, [])

  useEffect(() => {
    if(selectedProvinceSlug && !districts?.[selectedProvinceSlug]) {
      dispatch(getDistrictByProvinceSlug(selectedProvinceSlug))
    }
  }, [selectedProvinceSlug, dispatch, districts])

  useEffect(() => {
    if(selectedDistrictSlug && !metropolitans?.[selectedDistrictSlug]) {
      dispatch(getMetropolitanByDistrictSlug(selectedDistrictSlug))
    }

  }, [selectedDistrictSlug, dispatch, metropolitans])

  const handleProvinceChange = (value: string, option: any) => {
    const slug = option.slug;
    setSelectedProvinceSlug(slug);
  }

  const handleDistrictChange = (_: string, option: any) => {
    const slug = option.slug;
    setSelectedDistrictSlug(slug);
  }

  const handleFinish = (values: any) => {
    const data: IVehiclePartialInput = {
      model_number: values.model_number,
      number_of_cylinder: values.number_of_cylinder,
      fuel_type: values.fuel_type,
      electronic_equipment: values.electronic_equipment,
      address: {
        province: values.province,
        district: values.district,
        municipality_metropolitan: values.municipality_metropolitan,
        province_slug: selectedProvinceSlug || '',
        district_slug: selectedDistrictSlug || '',
      },
      father_or_husband: values.father_or_husband,
      weight_capacity: {
        total_weight: values.total_weight,
        lifting_capacity: values.lifting_capacity,
        no_of_seat: values.no_of_seat,
      },
      active_location: values.active_location,
      bhansar_payment: null,
      entry_proof: {
        proof_grant_office_name:values.proof_grant_office_name,
        entry_no: values.entry_proof_entry_no,
      },
      entry_permission: {
        entry_grant_police_office: values.entry_grant_police_office,
        entry_grant_date: values.entry_grant_date,
        entry_no: values.entry_permission_entry_no,
      },
      other_proofs: {
        other_proofs: values.other_proofs,
      }
    }

    VehicleService.partialUpdate(props.uuid, data as IVehiclePartialInput)
      .then(() => {
        message.success('Update successful!')
        props.hideVehicleForm();
      })
      .catch((err) => {
        message.error('Update failed. Please try again!');
      })
  }

  if(loading) {
    return (
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <Spin />
      </div>
    )
  }

  if(!initialValues) {
    return null;
  }

  return (
    <div className="verified-list-form-container">
      <Form {...layout} initialValues={initialValues} onFinish={handleFinish}>
        <Row>
          <Col span={12}>
            <Form.Item name="chassis_number" label="Chassis number">
              <Input disabled />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="engine_number" label="Engine number">
              <Input disabled />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Form.Item name="model" label="Model">
              <Input disabled />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="color" label="Color">
              <Input disabled />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Form.Item name="engine_capacity" label="Engine capacity">
              <Input disabled />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="engine_capacity_unit" label="Engine capacity unit">
              <Input disabled />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Form.Item name="province" label="Province">
              <Select onChange={handleProvinceChange} placeholder="Select province">
                {
                  provinces.map(province => {
                    return(
                      <Select.Option slug={province.slug} key={province.slug} value={province.title}>{province.title}</Select.Option> 
                    )
                  })
                }
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="district" label="District">
              <Select 
                placeholder="Select district" 
                onChange={handleDistrictChange}
                notFoundContent={districtLoading ? <Spin size="small" /> : null}
              >
                {
                  selectedProvinceSlug && districts?.[selectedProvinceSlug]?.map((district: IDistrict)=> {
                    return(
                      <Select.Option slug={district.slug} key={district.slug} value={district.title}>{district.title}</Select.Option> 
                    )
                  })
                }
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Form.Item name="municipality_metropolitan" label="Municipality metropolitan">
              <Select 
                placeholder="Select municipality metropolitan"
                notFoundContent={metropolitanLoading ? <Spin size="small" /> : null}
              >
                {
                  selectedDistrictSlug && metropolitans?.[selectedDistrictSlug]?.map((metropolitan: IMunicipalityMetropolitan)=> {
                    return(
                      <Select.Option key={metropolitan.slug} value={metropolitan.title}>{metropolitan.title}</Select.Option> 
                    )
                  })
                }
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="father_or_husband" label="Father or husband">
              <Input />
            </Form.Item>
          </Col>
        </Row>


        <Row>
          <Col span={12}>
            <Form.Item name="model_number" label="Model number">
              <Input placeholder="Model number" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="number_of_cylinder" label="Number of cylinder">
              <Input placeholder="Number of cylinder" />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Form.Item name="fuel_type" label="Fuel type">
              <Input placeholder="Fuel type" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="electronic_equipment" label="Electronic equipment">
              <Select
                mode="tags"
                placeholder="Type and press enter to add"
                onChange={() => {}}
                style={{ width: '100%' }}
              >
              </Select>


            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Form.Item name="total_weight" label="Total weight">
              <Input placeholder="Total weight" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="lifting_capacity" label="Lifting capacity">
              <Input placeholder="Lifting capacity" />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Form.Item name="no_of_seat" label="No of seat">
              <Input placeholder="No of seat" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="active_location" label="Active location">
              <Input placeholder="Active location" />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Form.Item name="proof_grant_office_name" label="Proof grant office name">
              <Input placeholder="Proof grant office name" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="entry_proof_entry_no" label="Entry proof entry no">
              <Input placeholder="Entry proof entry no" />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Form.Item name="entry_grant_police_office" label="Entry grant police office">
              <Input placeholder="Entry grant police office" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="entry_grant_date" label="Entry grant date">
              <NepaliDatePicker
                className="grant-date"
                inputClassName="form-control"
                value=""
                onChange={(value: string) => {
                  form.setFieldsValue({ entry_grant_date: value })
                }}
                options={{ calenderLocale: 'ne', valueLocale: 'en' }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Form.Item name="entry_permission_entry_no" label="Entry permission entry no">
              <Input placeholder="Entry permission entry no" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="other_proofs" label="Other proofs">
              <Input placeholder="Other proofs" />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Form.Item name="remarks" label="Remarks">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
          </Col>
        </Row>

        <Button htmlType="submit" type="primary">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default VehicleForm;
