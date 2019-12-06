import React, { Component } from "react";
import { Form, Alert, Card, Tabs, Row, Col, Radio, Layout } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { PersonItem, PersonItemStore } from "src/stores/test-store";
import { connect } from "redux-scaffolding-ts";
import autobind from "autobind-decorator";
import { PersonItemFormBody } from "./body";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { clone } from "src/utils/object";
import { formatMessage } from "src/services/http-service";
import FormEditorView from "src/components/form/form-editor";
import HeaderComponent from "../../components/shell/header";
const { Content } = Layout;


interface PersonItemViewProps
    extends RouteComponentProps<{ id: string }> {
    onClose: (id: string | undefined, item?: PersonItem) => void;
}

interface PersonItemViewState { }

@connect(["PersonItems", PersonItemStore])
class PersonItemView extends React.Component<
PersonItemViewProps & FormComponentProps,
PersonItemViewState
> {
    private get PersonItemStore() {
        return (this.props as any).TestItems as PersonItemStore;
    }

    constructor(props: PersonItemViewProps & FormComponentProps) {
        super(props);
        this.state = {};
    }

    componentWillMount(): void {
        this.load();
    }

    @autobind
    private load() {
        return this.PersonItemStore.getById(this.props.match.params.id);
    }

    @autobind
    private handleUpdateItem(values: any): Promise<any> {

        return this.PersonItemStore.Update(
            Object.assign(clone(this.PersonItemStore.state.item), values)
        );
    }

    @autobind
    private onDashboardChanged(e: any) {
        const dashboard = e.target.value;
        this.setState({ dashboard });
    }

    public render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Layout>
                <HeaderComponent title="PersonItemes" canGoBack={true} />
                <Content className="page-content">
                
                    <Row type={"flex"} align="top" justify="space-between">
                        {this.PersonItemStore.state.result &&
                            !this.PersonItemStore.state.result.isSuccess && (
                                <Alert
                                    type="error"
                                    message={"Ha ocurrido un error"}
                                    description={formatMessage(this.PersonItemStore.state.result)}
                                />
                            )}
                        <Card style={{ width: "100%" }}>
                            {this.PersonItemStore.state.item && (
                                <Row gutter={24}>
                                    <FormEditorView
                                        onSaveItem={this.handleUpdateItem}
                                        form={this.props.form}
                                        autosave={false}
                                    >
                                        <PersonItemFormBody
                                            item={this.PersonItemStore.state.item}
                                            getFieldDecorator={getFieldDecorator}
                                            getFieldValue={this.props.form.getFieldValue}
                                            setFieldsValue={this.props.form.setFieldsValue}
                                        />
                                    </FormEditorView>

                                </Row>
                            )}
                        </Card>
                    </Row>
                </Content>
            </Layout>
        );
    }
}

// Wire up the React component to the Redux store
export default (withRouter(Form.create({})(
    PersonItemView
) as any) as any) as React.ComponentClass<PersonItemViewProps>;
