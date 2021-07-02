import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import './naamSariForm.css';

interface Props {
  value?: string;
  selectedVehicle?: any;
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const NaamSariForm: React.FC<Props> = (props: Props) => {
  const { selectedVehicle } = props;
  const [vehicleDetails, setVehicleDetails] = useState({
    chassis_number: '',
    color: '',
    engine_capacity: '',
    engine_number: '',
    model: '',
    remarks: '',
    company_name: '',
    year_manufactured: '',
    seat_capacity: '',
    fuel_type: '',
    place_of_use: '',
    use: '',
    instrument_detail: '',
    horse_power: '',
    registration_date: '',
  });

  useEffect(() => {
    setVehicleDetails(selectedVehicle);
  }, []);

  useEffect(() => {
    // console.log('vehicle details here', vehicleDetails);
  }, [vehicleDetails]);

  return (
    <div className="verifiedListFormMainContainer">
      <Form {...layout}>
        <Form.Item label="ई.न्">
          <Input placeholder="input placeholder" />
        </Form.Item>

        <Form.Item label="चेसिस नम्बर ">
          <Input placeholder="input placeholder" />
        </Form.Item>

        <Form.Item label="अक्ष्यरेपी">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="नाम थर्">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="बाबु-पितको नाम">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="बाजेको नाम">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item>
          <h4>
            खरिद गर्ने - लीलाम साकार गर्ने - उपहार - बकस पाउनेको शाही
          </h4>
        </Form.Item>
        <Form.Item label="नाम थर्">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="बर्ष">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="ठेगाना अञ्चल">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="जिल्ला">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="गा.पा - न.पा - उ.म.न.पा - म.न.पा">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label=" वडा न">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="टोल">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="फोन नम्बर">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="मोबाइल">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="बाबु-पितको नाम">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="बाजेको नाम">
          <Input
            onChange={(event: any) => {
              setVehicleDetails({
                ...vehicleDetails,
                registration_date: event.target.value,
              });
            }}
            placeholder="input placeholder"
          />
        </Form.Item>
        <Form.Item label="ईमेल">
          <Input placeholder="input placeholder" />
        </Form.Item>

        <Form.Item>
          <h4>पेस भएका कागज हरु</h4>
        </Form.Item>

        <Form.Item>
          <span>१. लिने दिनेका दुबैका नाग्रीता</span>
        </Form.Item>
        <Form.Item label=" (क) दिनेको - जिल्ला">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="दिनेको नागरिकता नम्बर ">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="(ख) लिनेको - जिल्ला">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label=" लिनेको नागरिकता नम्बर">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item>
          <span>
            ४. संस्था - फिर्म - कम्पनी नाममा लेन्न्देन भएको भये
            सम्बन्धीको पत्र
          </span>
        </Form.Item>
        <Form.Item label="(क) पत्र सन्ख्या छ. न् ">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item>
          <span>५. नाम सारीको लागि बुझएको दस्तुर को</span>
        </Form.Item>
        <Form.Item label="रसिद न् ">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="र मिती">
          <Input placeholder="input placeholder" />
        </Form.Item>

        <Form.Item>
          <span>६. अन्य प्रमाणहरु - </span>
        </Form.Item>
        <Form.Item label=" (क) सवारि कागज् प्रमानपत्र ">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="(ख) लिनेको - जिल्ला">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label=" इति सम्बत् २०.. साल">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="महिना">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="गते">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="महिना">
          <Input placeholder="input placeholder" />
        </Form.Item>

        <Form.Item>
          <Button type="primary">Submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default NaamSariForm;
