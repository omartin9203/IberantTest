import React, { Component } from "react";
import { Layout, Input, Alert, Row, Col } from "antd";
import HeaderComponent from "../../components/shell/header";
import { TableModel, TableView } from "../../components/collections/table";
import { RouteComponentProps } from "react-router";
import { Query, ItemState } from "../../stores/dataStore";
import {
    PersonItemsStore,
    PersonItem
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
        return await this.PersonItemsStore.deleteAsync(`${item.id}`);
    }

  

    render() {
        const tableModel = {
            query: this.state.query,
            columns: [
                {
                    field: "name",
                    title: "Name",
                    renderer: data =>
                        <Link
                            to={{
                                pathname: `person/${data.id}`,
                                state: this.props.location.state
                            }}
                        >
                            <span>{data.Name}</span>
                        </Link>

                },
                {
                    field: "lastName",
                    title: "Last Name",
                    renderer: data => <span>{data.LastName}</span>,
                },
                {
                    field: "occupation",
                    title: "Occupation",
                    renderer: data => <span>{data.Occupation}</span>,
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
                        />
                        {this.state.newShow && <NewPersonItemView  onClose={this.onNewItemClosed}/>}
                    </div>
                </Content>
            </Layout>
        );
    }
}
