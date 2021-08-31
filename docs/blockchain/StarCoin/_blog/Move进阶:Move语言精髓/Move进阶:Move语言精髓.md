## Move语言三大精髓与NFT合约
>&emsp;&emsp;在学习完Move语言的初级语法等知识，就可以学习Move进阶知识点。  
&emsp;&emsp;在Move中最常用同时也是最有特点的三个点，是Move语言的精髓所在，这三个方面如下：
>- Struct
>- Ability
>- Generic
### helloWorld 代码示例
>&emsp;&emsp;在这段代码中包含了进阶中的三个方面Struct、Ability和Generic。
```move
address 0x2{
    module HelloWorld{
        use 0x1::Signer;
        use 0x1::Event;
        struct AnyWordEvent has drop,store {
            words:vector<u8>,
        }

        struct EventHolder has key{
            any_word_events:Event::EventHandle<AnyWordEvent>,
        }

        public (script) fun hello_world(account: &signer) acquires EventHolder {
            let addr = Signer::address_of(account);
            let hello_world = x"68656c6c6f20776f726c64";  // hello world
            let holder = borrow_global_mut<EventHolder>(addr);
            Event::emit_event<AnyWordEvent>(&mut holder.any_word_events, AnyWordEvent{words:hello_world});
        }
    }
}
```
上段代码:
- struct AnyWordEvent 是带有 drop，store Ability能力的Struct
- struct EventHolder &emsp;是带有 key Ability能力的Struct
- 在Move中没有string类型保存字符串，但是可以将字符串序列化为二进制后存入vector\<u8\>
## 一、Move的三大精髓
### 1. Struct
>&emsp;&emsp;**struct**是**实现自定义类型的唯一方法**。在Struct 中可以包含Move的原始数据类型bool、address、u8等，也可以包含**其他的Struct类型**。Struct采用**struct**作为关键字。  

#### (1)Struct 创建示例代码
>&emsp;&emsp;使用struct 关键字在模块中创建两个Struct
```move
address 0x2 {
    module StructExample1 {
        use 0x1::STC::STC;

        struct Empty{}

        struct MyStruct {
            address_field: address,
            bool_field: bool,
            u64_field: u64,
            vec_field: vector<u8>,
            inner_field: Empty,
            coins: STC,
        }
    }
}
```
上段代码:   
- 在&emsp;**0x2**&emsp;地址下创建&emsp;**StructExample1**&emsp;模块  
- 在模块中创建两个&emsp;Struct&emsp;分别为&emsp;**Empty**&emsp;和&emsp;**MyStruct**&emsp;  
- **Empty**&emsp;为空，在&emsp;**MyStruct**&emsp;中包含6个变量，它们的类型有Move的自带类型bool、address、u64也有自定义的Struct类型**Empty**
#### (2)Struct 应用示例代码
>&emsp;&emsp;使用struct关键字在模块中创建两个Struct,并通过模块中的函数来操作Struct的创建或销毁。
```move
address 0x2 {
    module StructExample2 {
        use 0x1::STC::STC;
        use 0x1::Vector;
        use 0x1::Token::{Self, Token};

        struct Empty{}

        struct MyStruct {
            address_field: address,
            bool_field: bool,
            u64_field: u64,
            vec_field: vector<u8>,
            inner_field: Empty,
            coins: Token<STC>,
        }

        fun new_empty() : Empty {
            Empty {}
        }

        fun destroy_empty(empty: Empty) {
            let Empty{} = empty;
        }

        public fun new_struct() : MyStruct {
            MyStruct {
                address_field: 0x1,
                bool_field: true,
                u64_field: 1000000,
                vec_field: Vector::empty(),
                inner_field: Self::new_empty(),
                coins: Token::zero<STC>(),
            }
        }

        public fun destroy_struct(my: MyStruct) {
            let MyStruct {
                address_field: _,
                bool_field: _,
                u64_field: _,
                vec_field: _,
                inner_field: empty,
                coins: coins,
            } = my;

            Self::destroy_empty(empty);
            Token::destroy_zero(coins);
        }
    }
}
```
上段代码:   
- 在上个示例的基础上增加了两个Struct的创建和销毁函数
- new_empty() 函数是Empty的创建函数，由于函数没有加public修饰符所以，这个函数是在当前module的私有函数，即不能通过直接调用new_empty()来创建Empty。
- destroy_empty() 函数是Empty的销毁函数，由于函数没有加public修饰符，所以这个函数是在当前module的私有函数，即不能通过直接调用destroy_empty()来销毁Empty。
- new_struct() 函数是MyStruct的创建函数，由于有public修饰符，所以可以在模块外使用，在其中一项成员使用的是Empty，所以需要调用new_empty来创建
- destroy_struct() 函数是MyStruct的销毁函数，由于有public修饰符，所以可以在模块外使用，在其中一项成员使用的是Empty，所以需要调用destroy_empty来销毁
####  (3)Struct、Function和Moudle的关系
>&emsp;&emsp;Module像是整个的工厂，可以生成销毁内部的Struct，Struct 像是原料，Function是操作原料的工具，可以在工厂(Module)中使用工具(function)来对原料(Struct)进行操控，在module中就可以通过function的组合操作Struct最后产生出不同的instance

![关系图](./img/st_Fun_Mod.png)
### 2. Ability
>&emsp;&emsp;Move语言可以通过Ability来修饰Struct， 从而控制Struct可用的操作。  
&emsp;&emsp;比如在Move中，定义资产或者NFT时就可以使用Ability，对于NFT来说，不可以进行复制，所以不能写Copy，从而保证了NFT的安全。对于钱来说,不可以去毁掉它,它只能在每个人手上流通,所以不可以带Drop。  
&emsp;&emsp;在定义Struct时除了Key,Struct的ability\<= Struct 内部属性的ability。  

Move语言中的Ability有四种：  
![Ability能力](./img/ability.png)
|能力|描述|
|----|----|
|Copy | 资源是否可以被复制|
|Drop | 资源在作用域结束时可以被丢弃|
|Key  | 资源是否可以作为键值对全局状态进行访问|
|Store| 资源可以被存储到全局状态|


**定义Struct时与内部的ability关系示例:**  
>&emsp;&emsp;定义一个Struct 内部有两个泛型 ,两个泛型的ability可以大于整体的ability。  
```move
struct Box<T1:copy + drop,T2:copy + drop + store> has copy,drop{
    contents_1: T1,
    contents_2: T2,
}
```
上段代码:
- T1的ability是copy和drop
- T2的ability是copy,drop和store
- Box的ability是copy和drop符合规则

#### (1)Drop
>在原有代码上增加Drop，并在销毁时使用drop能力销毁

**示例代码:**
```move
address 0x2 {
module AbilityExample1 {
    use 0x1::STC::STC;
    use 0x1::Vector;
    use 0x1::Token::{Self, Token};

    struct Empty has drop {}

    struct MyStruct {
        address_field: address,
        bool_field: bool,
        u64_field: u64,
            vec_field: vector<u8>,
        inner_field: Empty,
        coins: Token<STC>,
    }

    fun new_empty() : Empty {
	    Empty {}
    }

    fun destroy_empty(empty: Empty) {
	    let Empty{} = empty;
    }

    public fun new_struct() : MyStruct {
        MyStruct {
            address_field: 0x1,
                bool_field: true,
                u64_field: 1000000,
                vec_field: Vector::empty(),
                inner_field: Self::new_empty(),
                coins: Token::zero<STC>(),
        }
    }

    public fun destroy_struct(my: MyStruct) {
        let MyStruct {
            address_field: _,
            bool_field: _,
            u64_field: _,
            vec_field: _,
            inner_field: empty,
            coins: coins,
        } = my;

        Self::destroy_empty(empty);
        Token::destroy_zero(coins);
    }

    public fun destroy_struct_v2(my: MyStruct) {
        let MyStruct {
            address_field: _,
            bool_field: _,
            u64_field: _,
            vec_field: _,
            inner_field: _,
            coins: coins,
        } = my;

        Token::destroy_zero(coins);
    }
}
}
```
上段代码: 
- 在之前例子的代码中添加了destroy_struct_v2()函数用来销毁Struct
- 在Empty里增加了Drop能力,所以在销毁时可以使用 "_"的方式直接销毁无需调用destroy_empty()

#### (2)Copy
>&emsp;&emsp;创建两个Struct ，一个带有Copy能力，另一个不带，检测它们的区别

**示例代码:**

```move
address 0x2 {
    module AbilityExample2 {
        use 0x1::Debug;

        struct CopyStruct has copy {value:u64}
        struct MoveStruct {value:u64}

        public fun new_copy_struct() : CopyStruct {
            CopyStruct {value:100}
        }

        public fun destroy_copy_struct(copy_struct: CopyStruct) {
            let CopyStruct{value:_} = copy_struct;
        }

        public fun new_move_struct() : MoveStruct {
            MoveStruct {value:200}
        }

        public fun destroy_move_struct(move_struct: MoveStruct) {
            let MoveStruct {value:_} = move_struct;
        }

        public fun test() {
            let copy_struct = Self::new_copy_struct();
            let move_struct = Self::new_move_struct();
            Self::destroy_copy_struct(copy copy_struct);
            //Self::destroy_move_struct(copy move_struct);
            Self::destroy_move_struct(move_struct);
            Debug::print(&copy_struct.value);
            //Debug::print(&move_struct.value);
            Self::destroy_copy_struct(copy_struct);
        }
    }
}
```
上段代码: 
- 新创建了两个Struct CopyStruct和MoveStruct，其中CopyStruct有copy能力
- 分别创建这两个Struct的创建和销毁函数
- 销毁copy_struct的复制时代码可以执行，在销毁move_struct的复制时代码出错，move_struct不能被复制
- 因为销毁的是copy_struct的复制，所以依然打印copy_struct的值
- 但是move_struct本体已经销毁，所以不能打印move_struct的值

### 3. Generic
#### (1)Struct泛型
>泛型可以增加代码的灵活度，可以使不同的类型有统一的处理方法，可以让代码量减小。

比如定义一个Box里面存有u64类型的变量：
```move
struct Box{
    value:u64
}
```
如果要再定义一个带有u8类型的变量的Box:
```move
struct Box{
    value:u8
}
```
这样可以，但是没有必要，算法和数据结构需要写很多遍。这时就可以通过Generic来解决  
只需要定义一个带有Struct泛型的Box:
```move
struct Box<T>{
    value:T
}
```
在使用时通过指定T的类型就可以创建Box。

#### (2)Struct泛型+Ability
>可以在泛型中使用Ability,用来精准编写合约逻辑。
**代码示例:**
```move
struct Box<T1:copy + drop ,T2:copy + drop + store> has copy,drop{
    contents_1: T1,
    contents_2: T2,
}
```
- 多种Ability 用 "+" 
- Move的泛型的类型名不重要，顺序重要

#### (3)Struct泛型+Ability+Function
>当Struct使用泛型的时候，操作该Struct的Function也需要使用泛型。
**代码示例:**
```move
address 0x2{
    module Box2{

        struct Box<T1:copy + drop, T2:copy + drop + store> has copy,drop {
            contents_1: T1,
            contents_2: T2,
        }


        fun create_box<T1:copy + drop, T2:copy + drop + store>(val_1:T1, val_2:T2):Box<T1, T2> {
            Box {contents_1:val_1, contents_2:val_2}
        }

        public(script) fun create_bool_box<T2:copy + drop + store>(val_2:T2) {
            let _ = Self::create_box<bool, T2>(false, val_2);
        }

        public(script) fun create_bool_u64_box() {
            let _ = Self::create_box<bool, u64>(false, 100);
        }
    }
}
```
上段代码:
- Function在操作有泛型的Struct时，可以由调用者传入泛型也可以在内部指定泛型

## 二、常用合约
### 1. Vector
>Vector是在标准库中的一个Module,作用可以理解为C++中的Vector。

**常用函数：** 

|函数名|描述|
|----|----|
|public fun empty\<Element\>():vector\<Element\>;|创建一个空的vector|
|public fun pop_back\<Element\>(v: &mut vector\<Element\>):Element;|返回最后一个值的引用|
|public fun push_back\<Element\>(v: &mut vector\<Element\>,e:Element);|插入一个值|
|public fun length\<Element\>(v: &vector\<Element\>):u64;|返回vector的长度|
|public fun is_empty\<Element\>(v: &vector\<Element\>):bool;|判断vector是否为空|
|public fun contains\<Element\>(v: &vector\<Element\>,e:&Element):bool;|判断是否包含一个元素|
|public fun index_of\<Element\>(v: &vector\<Element\>,e:&Element):(bool,u64);|查看元素在vector中的位置|
|public fun remove\<Element\>(v: &mut vector\<Element\>,i:u64):Element;|删除vector中指定位置的元素|

### 2. Event
>Event 是标准库中的一个Module  

**常用函数:**

|函数名|描述|
|----|----|
|public fun new_event_handle\<T: drop + store\>(account: &signer):EventHandle\<T\> acquires EventHandleGenerator{}|定义一个新的Event|
|public fun emit_event\<T: drop + store\>(handle_ref: &mut EventHandle\<T\>,msg: T):{} |发送Event|

### 3. Error
>当区块链执行判断出错时中断合约

**常用:**
|函数|描述|
|----|----|
|assert(false,1000)|第一个参数判断为真时可以执行后续，为假则退出并发送错误码|
|abort(10000)|直接退出，并发送错误码|

## 三、NFT协议
### 1.NFT协议 V1
```move
address 0x2 {
    module NFTExample1 {
        use 0x1::Signer;
        use 0x1::Vector;

        struct NFT has key, store { name: vector<u8> }

        struct UniqIdList has key, store {
            data: vector<vector<u8>>
        }

        public fun initialize(account: &signer) {
            move_to(account, UniqIdList {data: Vector::empty<vector<u8>>()});
        }

        public fun new(account: &signer, name: vector<u8>): NFT acquires UniqIdList {
            let account_address = Signer::address_of(account);
            let exist = Vector::contains<vector<u8>>(&borrow_global<UniqIdList>(account_address).data, &name);
            assert(!exist, 1);
            let id_list = borrow_global_mut<UniqIdList>(account_address);
            Vector::push_back<vector<u8>>(&mut id_list.data, copy name);
            NFT { name }
        }
    }
}
```
上段代码：
- 在new函数中先检查NFT的名称是否被注册，如果注册了，则退出，未注册则可以继续注册
- 但是在该版本中没有销毁，不能进行销毁或删除

### 2. NFT协议 V2
```move
address 0x2 {
    module NFTExample2 {
        use 0x1::Signer;
        use 0x1::Vector;

        struct NFT<T: store> has key, store { name: T }

        struct UniqIdList<T: store> has key, store {
            data: vector<T>
        }

        public fun initialize(account: &signer) {
            move_to(account, UniqIdList {data: Vector::empty<vector<u8>>()});
        }

        public fun new(account: &signer, name: vector<u8>): NFT<vector<u8>> acquires UniqIdList {
            let account_address = Signer::address_of(account);
            let exist = Vector::contains<vector<u8>>(&borrow_global<UniqIdList<vector<u8>>>(account_address).data, &name);
            assert(!exist, 1);
            let id_list = borrow_global_mut<UniqIdList<vector<u8>>>(account_address);
            Vector::push_back<vector<u8>>(&mut id_list.data, copy name);
            NFT { name }
        }
    }
}
```
上段代码：
- 在NFT的Struct和UniqIdList增加泛型

### 3.NFT协议V3
```move
address 0x2 {
    module NFTExample3 {
        use 0x1::Signer;
        use 0x1::Vector;

        struct NFT<T: store> has key, store { name: T }

        struct UniqIdList<T: store> has key, store {
            data: vector<T>
        }

        public fun initialize<T: store>(account: &signer) {
            move_to(account, UniqIdList {data: Vector::empty<T>()});
        }

        public fun new<T: store + copy>(account: &signer, name: T): NFT<T> acquires UniqIdList {
            let account_address = Signer::address_of(account);
            let exist = Vector::contains<T>(&borrow_global<UniqIdList<T>>(account_address).data, &name);
            assert(!exist, 1);
            let id_list = borrow_global_mut<UniqIdList<T>>(account_address);
            Vector::push_back<T>(&mut id_list.data, copy name);
            NFT { name }
        }
    }
}
```
上段代码：
- 在new()函数中也增加泛型
### 4.NFT协议V4
```move
address 0x2 {
    module NFTExample4 {
        use 0x1::Vector;
        use 0x1::Event;

        struct NFT<T: store> has key, store { name: T }

        struct UniqIdList<T: store + drop> has key, store {
            data: vector<T>,
            nft_events: Event::EventHandle<NFTEvent<T>>,
        }

        struct NFTEvent<T: store + drop> has drop, store {
            name: T,
        }

        public fun initialize<T: store + drop>(account: &signer) {
            move_to(account, UniqIdList {data: Vector::empty<T>(), nft_events: Event::new_event_handle<NFTEvent<T>>(account)});
        }

        public fun new<T: store + copy + drop>(_account: &signer, account_address:address, name: T): NFT<T> acquires UniqIdList {
            let exist = Vector::contains<T>(&borrow_global<UniqIdList<T>>(account_address).data, &name);
            assert(!exist, 1);
            let id_list = borrow_global_mut<UniqIdList<T>>(account_address);
            Vector::push_back<T>(&mut id_list.data, copy name);
            let new_name = copy name;
            Event::emit_event(&mut id_list.nft_events, NFTEvent { name:new_name });
            NFT { name }
        }
    }
}
```
上段代码：
- 使用NFTEvent事件，事件的Struct必须要有drop和store能力。
## 四、问答环节
1. 投票时候币只有WithdrawEvent但是没有DepositEvent，这和老师刚讲的钱只能move有什么区别呢？ 是move到vote合约的意思吗？
- 答：对，Move的语义就是转移，在投票时所投的Token就是通过Move转移到投票合约中
2. move上有类似ERC20这样的标准吗
- 答：有的，但是不是Move中的，是Starcoin的stdlib中定义的类似ERC20的协议。但是在以太坊上的eth和ERC20的协议的Token的权限有所不同，但是Starcoin上的Token都是一样的。
3. Move有自定义异常和异常捕获吗？发现预期的异常得能处理吧
- 答：可以的，比如交易丢掉或者回返在output中
4. 泛型后面ability是要和定义的一样，还是子集就行
- 答：泛型字段的里的泛型可以和整体的Struct不完全相同，可以大于等于整体