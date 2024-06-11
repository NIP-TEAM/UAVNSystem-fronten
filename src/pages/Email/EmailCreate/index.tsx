import { FC, useContext, useEffect, useState } from "react";
import { EmailCreateGlobalProvider } from "./hooks";
import { BasicCard } from "@/components";
import { CollapseHeader, CollapseItem, Header } from "./components";
import { Button, Collapse, Flex, Form, FormProps } from "antd";
import { useLanguageContext } from "@/hooks";
import { PlusOutlined } from "@ant-design/icons";
import { EmailDataType, useCreateEmail } from "@/service";
import { AppContext } from "@/App";
import { useNavigate } from "react-router";

export interface EmailCreateProp {}

interface FormType {
  emails: EmailDataType[];
}

export const EmailCreate: FC<EmailCreateProp> = () => {
  const navigate = useNavigate();
  const { messageApi } = useContext(AppContext);
  const { LanguageText } = useLanguageContext<"CreateEmail">();

  const [form] = Form.useForm<FormType>();
  const [activeKeys, setActiveKeys] = useState<string[]>(["0"]);
  const emailsInfo = Form.useWatch("emails", form);

  // create api
  const {
    fetchData: fetchEmailCreate,
    code: emailCreateCode,
    error: emailCreateError,
    loading: emailCreateLoading,
  } = useCreateEmail(emailsInfo);
  useEffect(() => {
    if (emailCreateError) messageApi?.error(emailCreateError);
  }, [emailCreateError, messageApi]);
  useEffect(() => {
    if (emailCreateCode === 200) {
      messageApi?.success(LanguageText.createSuccess);
      navigate("/email/list");
    }
  }, [emailCreateCode, LanguageText.createSuccess, messageApi, navigate]);

  const onSubmit: FormProps["onFinish"] = () => fetchEmailCreate?.();
  const onFinishFailed: FormProps["onFinishFailed"] = (errorInfo) => {
    const { errorFields } = errorInfo;
    setActiveKeys(errorFields?.map((item) => item?.name?.[1].toString()) || []);
  };

  return (
    <EmailCreateGlobalProvider>
      <BasicCard>
        <Header />
        <Form
          form={form}
          onFinish={onSubmit}
          onFinishFailed={onFinishFailed}
          initialValues={{
            emails: [{ name: "new email 1", condition: [undefined] }],
          }}
        >
          <Form.List name="emails">
            {(fields, { add, remove }) => (
              <>
                <Collapse
                  bordered={false}
                  activeKey={activeKeys}
                  onChange={(e) => {
                    setActiveKeys(e as string[]);
                  }}
                  items={fields.map(
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    ({ key, name: parentFieldName, ...restField }) => ({
                      key: parentFieldName,
                      label: (
                        <CollapseHeader
                          {...{
                            headerTitle:
                              emailsInfo?.[parentFieldName]?.name || "",
                            restField,
                            parentFieldName,
                          }}
                          removeItem={() => {
                            setActiveKeys((prev) => [
                              ...prev.filter(
                                (item) => item !== parentFieldName.toString()
                              ),
                            ]);
                            remove(parentFieldName);
                          }}
                        />
                      ),
                      children: (
                        <CollapseItem
                          {...{
                            parentFieldName,
                            restField,
                          }}
                        />
                      ),
                    })
                  )}
                />
                <Button
                  type="link"
                  icon={<PlusOutlined />}
                  onClick={() => {
                    const activeValue = (
                      fields?.length > 0
                        ? fields[fields.length - 1]?.name + 1
                        : fields[0]?.name || 0
                    ).toString();
                    const titleValue = (
                      fields?.length > 0
                        ? fields[fields.length - 1]?.key + 2
                        : fields[0]?.key || 1
                    ).toString();
                    add({
                      name: "New email " + titleValue,
                    });
                    setActiveKeys([activeValue]);
                  }}
                >
                  {LanguageText.addEmail}
                </Button>
              </>
            )}
          </Form.List>
          <Form.Item>
            <Flex gap="small" justify="end">
              <Button
                type="primary"
                htmlType="submit"
                disabled={!emailsInfo?.length}
                loading={emailCreateLoading}
              >
                {LanguageText.addButton}
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      </BasicCard>
    </EmailCreateGlobalProvider>
  );
};
