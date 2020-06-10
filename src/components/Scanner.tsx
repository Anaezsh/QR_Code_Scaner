import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import {Camera} from 'expo-camera';

import {COLORS} from '../constants/colors';

import {BarCodeEvent} from 'expo-barcode-scanner/src/BarCodeScanner';

const Scanner = () => {
    const [hasPermission, setHasPermission] = useState<boolean | undefined>();
    const [isScanned, setIsScanned] = useState<boolean>(false);
    const [recognizedData, setRecognizedData] = useState<string | undefined>();

    useEffect(() => {
        (async () => {
            const {status} = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = (params: BarCodeEvent) => {
        if (isScanned) return;

        const {data} = params;
        setIsScanned(true);
        setRecognizedData(data);
    };

    const onScanPress = () => {
        setIsScanned(false)
    };

    const renderContent = () => {
        if (hasPermission === false) {
            return (
                <Text>Can not access the camera</Text>
            );
        }

        if (hasPermission === true) {
            return (
                <Camera
                    type={Camera.Constants.Type.back}
                    onBarCodeScanned={handleBarCodeScanned}
                    style={styles.flex1}
                >
                    <View style={styles.scanContainer}>
                        <View style={[styles.scanRect, isScanned ? styles.scanDetected : null]}/>
                    </View>

                    {recognizedData &&
                        <View style={styles.scanTextContainer}>
                            <Text>{recognizedData}</Text>
                        </View>
                    }

                    {isScanned &&
                        <TouchableOpacity
                            style={styles.scanButton}
                            onPress={onScanPress}
                        >
                            <Text>Scan</Text>
                        </TouchableOpacity>
                    }
                </Camera>
            );
        }

        return null;
    };

    return (
        <View style={styles.main}>
            {renderContent()}
        </View>
    );
};

export default React.memo(Scanner);

const styles = StyleSheet.create({
    main: {
        backgroundColor: COLORS.White,
        flex: 1,
    },
    flex1: {
        flex: 1,
    },
    scanContainer: {
        flex: 1,
        backgroundColor: COLORS.Transparent,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scanTextContainer: {
        height: 30,
        backgroundColor: COLORS.White,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    scanRect: {
        height: 250,
        width: 250,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: COLORS.Black,
    },
    scanDetected: {
        borderColor: COLORS.Green,
    },
    scanButton: {
        height: 40,
        backgroundColor: COLORS.Blue,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
});
