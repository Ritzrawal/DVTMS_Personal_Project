import "nepali-datepicker-reactjs/dist/index.css";
import { useState, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, Input, Select, message } from "antd";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";

import { IImportingGroup } from "../../../interfaces/IImportingGroup";
import { IVehicleEntryInput } from "../../../interfaces/IVehicleEntry";
import {
  addVehicleRow,
  editVehicleRow,
} from "../../../redux/actions/vehicleEntry";

import VehicleForm from "../VehicleForm";

import styles from "./style.module.scss";

const { Option } = Select;
interface IProps {
  preview: boolean;
  onFinish?: (d: IVehicleEntryInput) => void;
  groups: IImportingGroup[];
}

const VehicleEntryForm = (props: IProps) => {
  const dispatch = useDispatch();
  const preview = props.preview;
  const [noOfImports, setNoOfImports] = useState(0);
  const { allVehicles } = useSelector((state: any) => state.vehicleEntries);

  const handleSubmit = (values: any) => {
    const entryData: IVehicleEntryInput = {
      ...values,
    };

    props?.onFinish?.(entryData);
  };

  const addNewRow = () => {
    if (allVehicles.length >= noOfImports) {
      message.info("Cannot add new row.");
    } else {
      dispatch(addVehicleRow());
    }
  };

  const onEditableInputChange = (key: string, uuid: string) => (
    e: ChangeEvent<HTMLInputElement> | { target: { value: any } }
  ) => {
    dispatch(
      editVehicleRow({
        key,
        uuid,
        value: e.target.value,
      })
    );
  };

  const onImportsChange = (value: number) => {
    setNoOfImports(value);
  };

  let importedVehicles = [];
  for (let i = 1; i <= 1000; i++) {
    importedVehicles.push(i);
  }
  return (
    <>
      <Form onFinish={handleSubmit} className={styles["border-entry-form"]}>
        <div className={styles.companyDetail}>
          <Form.Item
            label="उत्पादक कम्पनिको नाम:"
            name="manufacturer_company"
            rules={[
              {
                required: true,
                message: "उत्पादक कम्पनिको  नाम लेख्नु होस",
              },
            ]}
          >
            <Select disabled={props.preview} className={styles.item}>
              {props?.groups?.map((group: IImportingGroup) => (
                <Option key={group.slug} value={group.slug}>
                  {group.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="आयातकर्ता कम्पनिको नाम:"
            name="importing_group"
            rules={[
              {
                required: true,
                message: "आयातकर्ता कम्पनिको नाम लेख्नु होस",
              },
            ]}
          >
            <Select
              disabled={props.preview}
              className={styles.item}
              placeholder="आयातकर्ता कम्पनिको नाम लेख्नु होस"
            >
              {props?.groups?.map((group: IImportingGroup) => (
                <Option key={group.slug} value={group.slug}>
                  {group.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="१ भन्सार सम्भन्धित बिवरण:"></Form.Item>
        </div>

        <div className={styles["bhansar-information"]}>
          <Form.Item
            label="ज्ञापनपत्र न"
            name="gyapan_patra_number"
            rules={[{ required: true, message: "ज्ञापनपत्र न लेख्नु होस" }]}
          >
            <Input
              disabled={preview}
              placeholder="ज्ञापनपत्र न लेख्नु होस"
              className={styles.item}
            />
          </Form.Item>

          <Form.Item
            label="भन्सार रसिद न"
            name="bhansar_rasid_number"
            rules={[{ required: true, message: "भन्सार रसिद न लेख्नु होस" }]}
          >
            <Input
              disabled={preview}
              placeholder="भन्सार रसिद न लेख्नु होस"
              className={styles.item}
            />
          </Form.Item>

          <Form.Item
            label="कार्यलयको नाम"
            name="organization_name"
            rules={[{ required: true, message: "कार्यलयको नाम लेख्नु होस" }]}
          >
            <Input
              disabled={preview}
              placeholder="कार्यलयको नाम लेख्नु होस"
              className={styles.item}
            />
          </Form.Item>

          <Form.Item
            label="उत्पादन बर्ष"
            name="manufactured_year"
            rules={[{ required: true, message: "उत्पादन बर्ष लेख्नु होस" }]}
          >
            <Input
              min={2000}
              max={3000}
              type="number"
              disabled={preview}
              placeholder="उत्पादन बर्ष लेख्नु होस"
              className={styles.item}
            />
          </Form.Item>

          <Form.Item
            label="रजिस्टर मिती "
            name="registered_at"
            rules={[{ required: true, message: "रजिस्टर मिती लेख्नु होस" }]}
          >
            <NepaliDatePicker
              className={styles.item}
              inputClassName="form-control"
              value=""
              onChange={(value: string) => {}}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
          </Form.Item>

          <Form.Item label="आयातकर्ता भएको सख्या " name="number_of_imports">
            <Select
              disabled={preview}
              className={styles.item}
              onChange={onImportsChange}
              placeholder="आयातकर्ता भएको सख्या "
            >
              {importedVehicles.map((number) => (
                <Option key={number} value={number}>
                  {" "}
                  {number}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <VehicleForm
          addNewRow={addNewRow}
          onChange={onEditableInputChange}
          preview={props.preview}
        />

        {!props.preview && (
          <Form.Item style={{ paddingTop: "12px" }}>
            <Button type="primary" htmlType="submit">
              Preview
            </Button>
          </Form.Item>
        )}
      </Form>
    </>
  );
};

export default VehicleEntryForm;
