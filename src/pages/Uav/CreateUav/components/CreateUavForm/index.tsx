import { Button, Divider, Flex, Form, Tabs, theme } from "antd";
import { FC, useContext, useEffect, useMemo, useState } from "react";
import { DeleteModal, GroupItem, ResetModal } from "./components";
import { useLanguageContext } from "@/hooks";
import { useNetworkData } from "@/service";
import { AppContext } from "@/App";
import StickyBox from "react-sticky-box";
import { UavDataType, useCreateUav } from "@/service/Uav";
import { SessionKeys, getSessionStorageUtil } from "@/utils";

export interface CreateUavFormProp {}

interface FormItem {
  networkId: number;
  uavs: { name?: string }[];
}

export interface StorageProtocal {
  networkId: number;
}

interface Form extends Record<"uavGroups", FormItem> {}

export const CreateUavForm: FC<CreateUavFormProp> = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { messageApi } = useContext(AppContext);
  const { LanguageText } = useLanguageContext<"Uav">();
  const [form] = Form.useForm<FormItem[]>();

  const [deleteModal, setDeleteModal] = useState(false);

  const {
    fetchData: fetchNetworkData,
    loading: networkLoading,
    data: networkData,
    code: networkCode,
    error: networkError,
  } = useNetworkData({
    pagination: { pageSize: 1000, current: 1, total: 1000 },
    filter: "",
  });
  useEffect(() => {
    if (networkError) messageApi?.error(networkError);
  }, [networkError, messageApi]);
  useEffect(() => {
    fetchNetworkData?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const networkOptions = useMemo(() => {
    if (networkCode === 200 && networkData?.data)
      return networkData?.data.map(({ name, id }) => ({
        label: name,
        value: id,
      }));
    return [];
  }, [networkCode, networkData?.data]);

  const uavGroups = Form.useWatch("uavGroups", form);
  useEffect(() => {
    // initValue
    const { networkId } = getSessionStorageUtil<StorageProtocal>(
      SessionKeys.CREATEUAV
    );
    form.setFieldValue("uavGroups", [{ uavs: [undefined], networkId }]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitData = useMemo(() => {
    const result: Partial<UavDataType>[] = [];
    uavGroups?.forEach((formItem: FormItem) => {
      formItem?.uavs?.forEach((item) => {
        result.push({
          name: item?.name,
          networkId: formItem.networkId,
        });
      });
    });
    return result;
  }, [uavGroups]);
  const {
    fetchData: fetchCreateData,
    code: createCode,
    error: createError,
    loading: createLoading,
  } = useCreateUav(submitData);
  useEffect(() => {
    if (createCode === 200) messageApi?.success(LanguageText.addSuccess);
  }, [LanguageText.addSuccess, createCode, messageApi]);
  useEffect(() => {
    if (createError) messageApi?.error(createError);
  }, [createError, messageApi]);

  const onFinish = () => {
    fetchCreateData?.();
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      initialValues={{ uavGroups: [{ uavs: [undefined] }] }}
    >
      <Divider />
      <Form.List name="uavGroups">
        {(groupFields, { add: addGroup, remove: removeGroup }) => (
          <Tabs
            type="editable-card"
            onEdit={(_, action: "add" | "remove") => {
              if (action === "add") addGroup({ uavs: [undefined] });
              else setDeleteModal(true);
            }}
            tabBarExtraContent={{
              right: (
                <Flex gap={5}>
                  <ResetModal reset={() => form.resetFields()} />
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={createLoading}
                  >
                    {LanguageText.submitTitle}
                  </Button>
                </Flex>
              ),
            }}
            renderTabBar={(props, DefaultTabBar) => (
              <StickyBox
                offsetTop={64}
                offsetBottom={20}
                style={{ zIndex: 1, background: colorBgContainer }}
              >
                <DefaultTabBar {...props} />
              </StickyBox>
            )}
            items={groupFields.map(
              (
                { key: groupKey, name: groupName, ...restGroupFeild },
                groupIndex
              ) => ({
                label:
                  networkOptions.find(
                    ({ value }) => value === uavGroups[groupKey]?.networkId
                  )?.label || LanguageText.groupTempTitle,
                key: groupIndex.toString(),
                children: (
                  <>
                    <DeleteModal
                      {...{
                        deleteModal,
                        setDeleteModal,
                        onOk: () => {
                          removeGroup(Number(groupIndex));
                          setDeleteModal(false);
                        },
                      }}
                    />
                    <GroupItem
                      {...{
                        groupKey,
                        groupName,
                        restGroupFeild,
                        networkOptions,
                        networkLoading,
                      }}
                    />
                  </>
                ),
              })
            )}
          />
        )}
      </Form.List>
    </Form>
  );
};
