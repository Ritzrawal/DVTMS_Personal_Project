import {
  Form,
  Input,
  InputNumber,
  Button,
  Radio,
  DatePicker,
} from 'antd';
import styles from './style.module.scss';
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};

const validateMessages = {
  required: '${name} अनिवार्य हो !',
  types: {
    email: '${label} is not a valid email!',
  },
};
const config = {
  rules: [
    {
      type: 'object' as const,
      required: true,
      message: 'अनिवार्य हो',
    },
  ],
};

const NamsariComponent = () => {
  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <div className={styles['namsari-container']}>
      <Form
        {...layout}
        className={styles['form-customize']}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <div className={styles['namsari-left-container']}>
          <Form.Item
            className={styles['form-items']}
            name="इ.नं"
            label="इ.नं"
            rules={[{ required: true }]}
          >
            <Input placeholder="इ.नं" />
          </Form.Item>
          <Form.Item
            label="चेसिस न"
            name="चेसिस न"
            rules={[{ required: true }]}
          >
            <Input placeholder="चेसिस न" />
          </Form.Item>
          <Form.Item
            label="रु"
            name="रु"
            rules={[{ required: true }]}
          >
            <Input placeholder="रु" />
          </Form.Item>
          <Form.Item>
            <p className={styles['form-title']}>अक्षरेपी </p>
          </Form.Item>
          <Form.Item
            label="नाम थर –"
            name="नाम थर"
            rules={[{ required: true, message: '' }]}
          >
            <Form.Item
              name="नाम"
              rules={[{ required: true }]}
              style={{
                display: 'inline-block',
                width: 'calc(50% - 8px)',
              }}
            >
              <Input placeholder="नाम" />
            </Form.Item>
            <Form.Item
              name="थर"
              rules={[{ required: true }]}
              style={{
                display: 'inline-block',
                width: 'calc(50% - 8px)',
                margin: '0 8px',
              }}
            >
              <Input placeholder="थर" />
            </Form.Item>
          </Form.Item>
          <Form.Item
            name="बाबु/पतिको नाम"
            label="बाबु–पतिको नाम –"
            rules={[{ required: true }]}
          >
            <Input placeholder="बाबु/पतिको नाम" />
          </Form.Item>
          <Form.Item
            label="बाजेको नाम –"
            name="बाजेको नाम"
            rules={[{ required: true }]}
          >
            <Input placeholder="बाजेको नाम" />
          </Form.Item>
        </div>

        <div className={styles['namsari-right-container']}>
          {/* <p>खरिद गर्ने–लिलाम सकार गर्ने–उपहार– वकस पाउनेको सही</p> */}

          <div className={styles['right-inner-container']}>
            <Form.Item>
              <p className={styles['form-title']}>
                खरिद गर्ने–लिलाम सकार गर्ने–उपहार– वकस पाउनेको सही
              </p>
            </Form.Item>
            <Form.Item
              label="नाम थर –"
              name="नाम थर –"
              rules={[{ required: true, message: '' }]}
            >
              <Form.Item
                name="नाम"
                rules={[{ required: true }]}
                style={{
                  display: 'inline-block',
                  width: 'calc(50% - 8px)',
                }}
              >
                <Input placeholder="नाम" />
              </Form.Item>
              <Form.Item
                name="थर"
                rules={[{ required: true }]}
                style={{
                  display: 'inline-block',
                  width: 'calc(50% - 8px)',
                  margin: '0 8px',
                }}
              >
                <Input placeholder="थर" />
              </Form.Item>
            </Form.Item>
            <Form.Item
              label="वर्ष –"
              name="वर्ष"
              rules={[{ required: true }]}
            >
              <InputNumber
                placeholder="वर्ष"
                className={styles['input-number']}
              />
            </Form.Item>
            <Form.Item
              label="ठेगाना -"
              name="ठेगाना"
              rules={[{ required: true, message: '' }]}
            >
              <Form.Item
                name="अञ्चल"
                rules={[{ required: true }]}
                style={{
                  display: 'inline-block',
                  width: 'calc(50% - 8px)',
                }}
              >
                <Input placeholder="अञ्चल" />
              </Form.Item>
              <Form.Item
                name="जिल्ला"
                rules={[{ required: true }]}
                style={{
                  display: 'inline-block',
                  width: 'calc(50% - 8px)',
                  margin: '0 8px',
                }}
              >
                <Input placeholder="जिल्ला" />
              </Form.Item>
              <Form.Item>
                <Radio.Group>
                  <Radio value={1}>गा.पा</Radio>
                  <Radio value={2}>न.पा</Radio>
                  <Radio value={3}>उ.म.न.पा</Radio>
                  <Radio value={4}>म.न.पा</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item>
                <Form.Item
                  name="वडा नं"
                  rules={[{ required: true }]}
                  style={{
                    display: 'inline-block',
                    width: 'calc(50% - 8px)',
                  }}
                >
                  <Input placeholder="वडा नं." />
                </Form.Item>
                <Form.Item
                  name="टोल"
                  rules={[{ required: true }]}
                  style={{
                    display: 'inline-block',
                    width: 'calc(50% - 8px)',
                    margin: '0 8px',
                  }}
                >
                  <Input placeholder="टोल –" />
                </Form.Item>
              </Form.Item>
            </Form.Item>
            <Form.Item
              label="सम्पर्क -"
              name="सम्पर्क"
              rules={[{ required: true, message: '' }]}
            >
              <Form.Item
                name="फोन नं"
                rules={[{ required: true }]}
                style={{
                  display: 'inline-block',
                  width: 'calc(50% - 8px)',
                }}
              >
                <Input placeholder="फोन नं" />
              </Form.Item>
              <Form.Item
                name="मोवाईल"
                rules={[{ required: true }]}
                style={{
                  display: 'inline-block',
                  width: 'calc(50% - 8px)',
                  margin: '0 8px',
                }}
              >
                <Input placeholder="मोवाईल" />
              </Form.Item>
            </Form.Item>
            <Form.Item
              label="बाबु–पतिको नाम –"
              name="बाबु–पतिको नाम"
              rules={[{ required: true }]}
            >
              <Input placeholder="बाबु–पतिको नाम" />
            </Form.Item>
            <Form.Item
              label="बाजेको नाम –"
              name="बाजेको नाम"
              rules={[{ required: true, message: '' }]}
            >
              <Form.Item
                name="नाम"
                rules={[{ required: true }]}
                style={{
                  display: 'inline-block',
                  width: 'calc(50% - 8px)',
                }}
              >
                <Input placeholder="नाम –" />
              </Form.Item>
              <Form.Item
                name="थर"
                rules={[{ required: true }]}
                style={{
                  display: 'inline-block',
                  width: 'calc(50% - 8px)',
                  margin: '0 8px',
                }}
              >
                <Input placeholder="थर " />
              </Form.Item>
            </Form.Item>
            <Form.Item
              label=" ईमेल –"
              name="ईमेल"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </div>
        </div>
        <div className={styles['bottom-container']}>
          <Form.Item style={{ width: '100%', paddingLeft: 30 }}>
            <p className={styles['form-title']}>
              पेश भएका कागजपत्रहरू{' '}
            </p>
          </Form.Item>
          <Form.Item
            label="१. लिने दिने दुबैका नागरिकता – "
            name="लिने दिने दुबैका नागरिकता"
            rules={[{ required: true, message: '' }]}
          >
            <Form.Item
              label="(क) दिनेको  "
              name="दिनेको"
              rules={[{ required: true, message: '' }]}
              style={{ marginBottom: 0 }}
            ></Form.Item>
            <Form.Item
              name="जिल्ला"
              rules={[{ required: true }]}
              style={{
                display: 'inline-block',
                width: 'calc(50% - 8px)',
              }}
            >
              <Input placeholder="जिल्ला" />
            </Form.Item>
            <Form.Item
              name="नागरिकता नं"
              rules={[{ required: true }]}
              style={{
                display: 'inline-block',
                width: 'calc(50% - 8px)',
                margin: '0 8px',
              }}
            >
              <InputNumber
                placeholder="नागरिकता नं. –"
                className={styles['input-number']}
              />
            </Form.Item>
            <Form.Item
              label="(ख) लिनेको   "
              style={{ marginBottom: 0 }}
              name="लिनेको"
              rules={[{ required: true, message: '' }]}
            ></Form.Item>
            <Form.Item
              name="जिल्ला"
              rules={[{ required: true }]}
              style={{
                display: 'inline-block',
                width: 'calc(50% - 8px)',
              }}
            >
              <Input placeholder="जिल्ला" />
            </Form.Item>
            <Form.Item
              name="नागरिकता नं"
              rules={[{ required: true }]}
              style={{
                display: 'inline-block',
                width: 'calc(50% - 8px)',
                margin: '0 8px',
              }}
            >
              <InputNumber
                placeholder="नागरिकता नं. –"
                className={styles['input-number']}
              />
            </Form.Item>
          </Form.Item>
          <Form.Item
            label="संस्था–फर्म–कम्पनीको नाममा लेनदेन भएको भए सम्बन्धितको पत्र – "
            style={{ marginBottom: 0 }}
          >
            <Form.Item
              label="(क) पत्र संख्या "
              style={{ marginBottom: 0 }}
            ></Form.Item>
            <Form.Item
              name="पत्र संख्या"
              // rules={[{ required: true }]}

              style={{
                display: 'inline-block',
                width: 'calc(50% - 8px)',
              }}
            >
              <InputNumber
                placeholder="च. नं"
                className={styles['input-number']}
              />
            </Form.Item>
            <Form.Item
              name=" पत्र मिति"
              className={styles['input-date']}
              style={{
                display: 'inline-block',
                width: 'calc(50% - 8px)',
                margin: '0 8px',
              }}
            >
              <DatePicker placeholder="मिति" />
            </Form.Item>
          </Form.Item>
          <Form.Item
            label="नामसारीको लागि बुझाएको दस्तुरको रसिद नं. "
            name="नामसारीको लागि बुझाएको दस्तुरको रसिद नं"
            rules={[{ required: true, message: '' }]}
          >
            <Form.Item
              name="रसिद नं"
              rules={[{ required: true }]}
              style={{
                display: 'inline-block',
                width: 'calc(50% - 8px)',
              }}
            >
              <InputNumber
                className={styles['input-number']}
                placeholder="रसिद नं"
              />
            </Form.Item>
            <Form.Item
              {...config}
              name="मिति"
              className={styles['input-number']}
              rules={[{ required: true }]}
              style={{
                display: 'inline-block',
                width: 'calc(50% - 8px)',
                margin: '0 8px',
              }}
            >
              <DatePicker placeholder="मिति" />
            </Form.Item>
          </Form.Item>
          <Form.Item
            label="अन्य प्रमाणहरू –"
            // rules={[{ required: true, message: "Name is required!" }]}
          >
            <Radio.Group>
              <Radio value={1}>(क) सवारी कागजपत्र प्रमाणपत्र</Radio>
              <Radio value={2}>(ख) सवारी कागज प्रमाणपत्र</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="इति सम्बत" label="इति सम्बत " {...config}>
            <DatePicker
              placeholder="इति सम्बत"
              style={{ width: '50%' }}
            />
          </Form.Item>
        </div>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default NamsariComponent;
