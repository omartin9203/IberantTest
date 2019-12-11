import { DataStore, DataModel } from './dataStore';
import { FormStore } from './formStore';
import { repository, reduce, AsyncAction } from 'redux-scaffolding-ts';
import { Validator } from "lakmus";
import { AxiosResponse } from 'axios';
import { container } from '../inversify.config';
import { CommandResult } from './types';

//PERSON REGION
export interface PersonItem {
    id: number;
    name: string;
    lastName: string;
    occupation: string;
}

@repository("@@PersonItem", "PersonItem.summary")
export class PersonItemsStore extends DataStore<PersonItem> {
    baseUrl: string = "api/person";

    constructor() {
        super('PersonItem', {
            count: 0,
            isBusy: false,
            items: [],
            result: undefined,
            discard: item => { }
        }, container);
    }
}

export interface NewPersonItem {
    name: string;
    lastName: string;
    occupation: string;
}

export class NewPersonValidator extends Validator<NewPersonItem> {
    constructor() {
        super();

        this.ruleFor(x => x.name)
            .notNull()
            .withMessage("Name cant be empty");

        this.ruleFor(x => x.lastName)
            .notNull()
            .withMessage("Last Name cant be empty")

        this.ruleFor(x => x.occupation)
            .notNull()
            .withMessage("Occupation cant be empty")
    }
}

@repository("@@PersonItem", "PersonItem.new")
export class NewPersonItemStore extends FormStore<NewPersonItem> {
    baseUrl: string = "api/person";

    protected validate(item: NewPersonItem) {
        return (new NewPersonValidator()).validate(item);
    }

    constructor() {
        super('NEW_PersonItem', {
            isBusy: false,
            status: 'New',
            item: undefined,
            result: undefined
        }, container);
    }
}

export class PersonValidator extends Validator<PersonItem> {
    constructor() {
        super();

        this.ruleFor(x => x.name)
            .notNull()
            .withMessage("Name cant be null");

        this.ruleFor(x => x.lastName)
            .notNull()
            .withMessage("Last Name cant be null")

        this.ruleFor(x => x.occupation)
            .notNull()
            .withMessage("Occupation cant be null")

    }
}

const PersonItem_UPDATE_ITEM = "PersonItem_UPDATE_ITEM";
@repository("@@PersonItem", "PersonItem.detail")
export class PersonItemStore extends FormStore<PersonItem> {
    baseUrl: string = "api/person";

    protected validate(item: PersonItem) {
        return new PersonValidator().validate(item);
    }

    constructor() {
        super('PersonItem', {
            isBusy: false,
            status: 'New',
            item: undefined,
            result: undefined
        }, container);
    }

    public async Update(item: PersonItem) {
        var result = await super.patch(PersonItem_UPDATE_ITEM, `${item.id}`, item) as any;
        return result.data as CommandResult<PersonItem>;
    }

    @reduce(PersonItem_UPDATE_ITEM)
    protected onUpdateBillingOrder(): AsyncAction<AxiosResponse<CommandResult<PersonItem>>, DataModel<PersonItem>> {
        return super.onPatch();
    }
}


//TEST REGION 

export interface TestItem {
    id: number;
    title: string; 
    description: string;
}

@repository("@@TestItem", "TestItem.summary")
export class TestItemsStore extends DataStore<TestItem> {
    baseUrl: string = "api/test";

    constructor() {
        super('TestItem', {
            count: 0,
            isBusy: false,
            items: [],
            result: undefined,
            discard: item => { }
        }, container);
    }

  

   
}

export interface NewTestItem {
    title: string,
    description: string,
}

export class NewTestValidator extends Validator<NewTestItem> {
    constructor() {
        super();

        this.ruleFor(x => x.title)
            .notNull()
            .withMessage("Title cant be empty");
    }
}

@repository("@@TestItem", "TestItem.new")
export class NewTestItemStore extends FormStore<NewTestItem> {
    baseUrl: string = "api/test";

    protected validate(item: NewTestItem) {
        return (new NewTestValidator()).validate(item);
    }

    constructor() {
        super('NEW_TestItem', {
            isBusy: false,
            status: 'New',
            item: undefined,
            result: undefined
        }, container);
    }
}

export class TestValidator extends Validator<TestItem> {
    constructor() {
        super();

        this.ruleFor(x => x.title)
            .notNull()
            .withMessage("Title can not be null");

    }
}

const TestItem_UPDATE_ITEM = "TestItem_UPDATE_ITEM";
@repository("@@TestItem", "TestItem.detail")
export class TestItemStore extends FormStore<TestItem> {
    baseUrl: string = "api/test";

    protected validate(item: TestItem) {
        return new TestValidator().validate(item);
    }

    constructor() {
        super('TestItem', {
            isBusy: false,
            status: 'New',
            item: undefined,
            result: undefined
        }, container);
    }

    public async Update(item: TestItem) {
        var result = await super.patch(TestItem_UPDATE_ITEM, `${item.id}`, item) as any;
        return result.data as CommandResult<TestItem>;
    }

    @reduce(TestItem_UPDATE_ITEM)
    protected onUpdateBillingOrder(): AsyncAction<AxiosResponse<CommandResult<TestItem>>, DataModel<TestItem>> {
        return super.onPatch();
    }
}