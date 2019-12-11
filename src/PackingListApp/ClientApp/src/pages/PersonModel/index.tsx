import React, { Component } from "react";
import { Layout, Input, Alert, Row, Col, Result } from "antd";
import HeaderComponent from "../../components/shell/header";
import { TableModel, TableView } from "../../components/collections/table";
import { RouteComponentProps } from "react-router";
import { Query, ItemState } from "../../stores/dataStore";
import {
    PersonItemsStore,
    PersonItem,
    PersonItemStore
} from "src/stores/test-store";
import { connect } from "redux-scaffolding-ts";
import autobind from "autobind-decorator";
import { CommandResult } from "../../stores/types";
import { Link } from "react-router-dom";
import { formatDate } from "src/utils/object";
const { Content } = Layout;
import NewPersonItemView from "./body"

interface PersonItemListProps extends RouteComponentProps { }

interface PersonItemListState {
    query: Query;
    newShow: boolean;
}

@connect(["PersonItems", PersonItemsStore])
export default class PersonItemListPage extends Component<
    PersonItemListProps,
    PersonItemListState
> {
    private id: number = -1;
    
    private get PersonItemsStore() {
        return (this.props as any).PersonItems as PersonItemsStore;
    }

    constructor(props: PersonItemListProps) {
        super(props);

        this.state = {
            query: {
                searchQuery: "",
                orderBy: [
                    { field: "id", direction: "Ascending", useProfile: false }
                ],
                skip: 0,
                take: 10
            },
            newShow: false
        };
    }

    componentWillMount() {

        this.load(this.state.query);
    }

    @autobind
    private async load(query: Query) {
        await this.PersonItemsStore.getAllAsync(query);
    }

    @autobind
    private async onSaveItem(item: PersonItem, state: ItemState) {
        var result = await this.PersonItemsStore.saveAsync(
            `${item.id}`,
            item,
            state
        );
        await this.load(this.state.query);
        return result;
    }

    @autobind
    private onQueryChanged(query: Query) {
        this.setState({ query });
        this.load(query);
    }


    @autobind
    private async onNewItem() {
        this.setState({ newShow: true })
    }


    @autobind
    private onNewItemClosed() {
        this.setState({ newShow: false });
        this.load(this.state.query);
    }
  

    @autobind
    private async onDeleteRow(
        item: PersonItem,
        state: ItemState
    ): Promise<CommandResult<any>> {
        var result = await this.PersonItemsStore.deleteAsync(`${item.id}`);
        await this.load(this.state.query);
        return result;
    }

  

    render() {
        const tableModel = {
            query: this.state.query,
            columns: [
                {
                    field: "name",
                    title: "Name",
                    renderer: data => <span>{data.name}</span>,
                    editor: data => <Input />

                },
                {
                    field: "lastName",
                    title: "Last Name",
                    renderer: data => <span>{data.lastName}</span>,
                    editor: data => <Input />
                },
                {
                    field: "occupation",
                    title: "Occupation",
                    renderer: data => <span>{data.occupation}</span>,
                    editor: data => <Input />

                },

            ],
            data: this.PersonItemsStore.state,
            sortFields: [


            ]
        } as TableModel<PersonItem>;

        return (
            <Layout>
                <HeaderComponent title="PersonModels" canGoBack={true} />

                <Content className="page-content">
                    {this.PersonItemsStore.state.result &&
                        !this.PersonItemsStore.state.result.isSuccess && (
                            <Alert
                                type="error"
                                message={"Ha ocurrido un error"}
                                description={this.PersonItemsStore.state.result.messages
                                    .map(o => o.body)
                                    .join(", ")}
                            />
                        )}

                    <div style={{ margin: "12px" }}>
                        <TableView
                            rowKey={"id"}
                            model={tableModel}
                            onQueryChanged={(q: Query) => this.onQueryChanged(q)}
                            onNewItem={this.onNewItem}
                            onRefresh={() => this.load(this.state.query)}
                            canDelete={true}
                            canCreateNew={true}
                            hidepagination={true}
                            onDeleteRow={this.onDeleteRow}
                            canEdit={true}
                            onSaveRow={this.onSaveItem}
                        />
                        {this.state.newShow && <NewPersonItemView  onClose={this.onNewItemClosed}/>}
                    </div>
                </Content>
            </Layout>
        );
    }
}
