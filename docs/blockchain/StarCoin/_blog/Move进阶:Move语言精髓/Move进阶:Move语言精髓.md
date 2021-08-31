## Move语言三大精髓
>在学习完Move语言的初级语法等知识，就可以学习Move进阶知识点。  
在Move中最常用同时也是最有特点的三个点，是Move语言的精髓所在，这三个方面如下：
>- Struct
>- Ability
>- Generic
### helloWorld 代码示例
>在这段代码中包含了进阶中的三个方面Struct、Ability和Generic。
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
- struct AnyWordEvent 是带有 drop，store Ability能力的Struct
- struct EventHolder &emsp;是带有 key Ability能力的Struct
- 在Move中没有string类型保存字符串，但是可以将字符串序列化为二进制后存入vector<u8>
### 1. Struct
>&emsp;&emsp;**struct**是**实现自定义类型的唯一方法**。在Struct 中可以包含Move的原始数据类型bool、address、u8等，也可以包含**其他的Struct类型**。Struct采用**struct**作为关键字。  

#### &emsp; (1)&emsp; Struct 创建示例代码
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
&emsp;&emsp;在上段代码中   
- 在&emsp;**0x2**&emsp;地址下创建&emsp;**StructExample1**&emsp;模块  
- 在模块中创建两个&emsp;Struct&emsp;分别为&emsp;**Empty**&emsp;和&emsp;**MyStruct**&emsp;  
- **Empty**&emsp;为空，在&emsp;**MyStruct**&emsp;中包含6个变量，它们的类型有Move的自带类型bool、address、u64也有自定义的Struct类型**Empty**
#### &emsp; (2)&emsp; Struct 应用示例代码
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
&emsp;&emsp;在上段代码中：   
- 在上个示例的基础上增加了两个Struct的创建和销毁函数
- new_empty() 函数是Empty的创建函数，由于函数没有加public修饰符所以，这个函数是在当前module的私有函数，即不能通过直接调用new_empty()来创建Empty。
- destroy_empty() 函数是Empty的销毁函数，由于函数没有加public修饰符，所以这个函数是在当前module的私有函数，即不能通过直接调用destroy_empty()来销毁Empty。
- new_struct() 函数是MyStruct的创建函数，由于有public修饰符，所以可以在模块外使用，在其中一项成员使用的是Empty，所以需要调用new_empty来创建
- destroy_struct() 函数是MyStruct的销毁函数，由于有public修饰符，所以可以在模块外使用，在其中一项成员使用的是Empty，所以需要调用destroy_empty来销毁
####  &emsp; (3)&emsp; Struct、Function和Moudle的关系
>&emsp;&emsp;Module像是整个的工厂，可以生成销毁内部的Struct，Struct 像是原料，Function是操作原料的工具，可以在工厂(Module)中使用工具(function)来对原料(Struct)进行操控，在module中就可以通过function的组合操作Struct最后产生出不同的instance

![关系图](./img/st_Fun_Mod.png)
### 2. Ability
>&emsp;&emsp;Move语言可以通过Ability来修饰Struct， 从而控制Struct可用的操作。  
&emsp;&emsp;比如在Move中，定义资产或者NFT时就可以使用Ability，对于NFT来说，不可以进行复制，所以不能写Copy，从而保证了NFT的安全。对于钱来说,不可以去毁掉它,它只能在每个人手上流通,所以不可以带Drop。

Move语言中的Ability有四种：  
![Ability能力](./img/ability.png)

